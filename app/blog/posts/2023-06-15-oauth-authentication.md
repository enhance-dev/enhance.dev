---
title: OAuth Authentication
image: "/_public/blog/post-assets/oauth/hand-shake.jpeg"
image_alt: "Magic Trick"
photographer: "Masjid MABA"
photographer_url: "https://unsplash.com/@masjidmaba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: enhance, authentication
description: "With more services come more passwords and usernames to keep track of. OAuth lets users authenticate to a new service using a previously established identity on another service."
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
twitter: "ryanbethel"
mastodon: "@ryanbethel@indieweb.social"
published: "June 15, 2023"
series: "Enhance Auth"
---



More and more of our lives take place online. With more services come more passwords and usernames to keep track of. OAuth lets users authenticate to a new service using a previously established identity on another service. This final post in our Authentication series shows how to use OAuth with Enhance apps to authenticate new users.

Authentication can be intimidating. Not necessarily because it is hard to understand, but more because it feels like the consequences of making a mistake are high. This is one of the reasons that people choose OAuth. It allows you to rely on another service (i.e., GitHub, Google, etc.) to establish a user's identity and store the relevant information for their account. While that is true and beneficial, it is important to understand how this process works so that your interface with the 3rd party provider, and the portion of user details transferred to your app, remain secure.


## TL;DR

OAuth is a specification that allows a user to establish their identity for one site by logging in on a third-party site. That third-party provider is trusted to vouch for the user while only providing the account details that the user approves to be shared. The rest of this post and sample code uses GitHub as the example third-party provider. If a user visits the site example.com to create a new account. They are saying “You don’t know me, but GitHub does and they will vouch for me.” Example.com then redirects the user to GitHub where they are asked to log in to prove their identity. After that GitHub sends the user back to example.com with a code that can be used to verify successful login to GitHub. The example.com server can then send this code/token to GitHub and receive verification that that is a legitimate GitHub account. Example.com will then use the GitHub username to identify the new account.


![OAuth Sequence Diagram](/_public/blog/post-assets/oauth/oauth-serverless-flow.png)



## GitHub OAuth Keys

Using OAuth requires setting up the 3rd party provider to work with your app. For GitHub, you need to do the following:

1. **Sign in to GitHub**
2. **Navigate to Settings**: Click on your profile photo in the top right corner and select 'Settings' from the dropdown menu.
3. **Go to Developer Settings**: Scroll down the user settings sidebar and click on 'Developer settings'.
4. **Create a New OAuth App**: Click on 'OAuth Apps' in the left sidebar and then click on the 'New OAuth App' button.
5. **Fill in the App Details**:
    * 'Authorization callback URL': The URL where users are sent after they authorize with GitHub. It can be the main URL for the whole application.
6. **Register the App**
7. **Copy the Client ID and Client Secret into environment variables**


<begin-code filename="/.env">

```bash
OAUTH_CLIENT_ID=key
OAUTH_CLIENT_SECRET=secret
OAUTH_AUTHORIZE_URL=https://github.com/login/oauth/authorize
OAUTH_TOKEN_URL=https://github.com/login/oauth/access_token
OAUTH_USERINFO_URL=https://api.github.com/user
```

</begin-code>


Make sure to keep the Client Secret a secret. If it is compromised anyone can impersonate your app. In addition to the API keys, create environment variables for the OAuth endpoints. The example above includes the endpoints and corresponding environment variables for GitHub.

If there are several environments for your app (i.e., staging and production) they will each need to have a separate OAuth app setup. These cannot share keys because the app configuration tells GitHub the URL it is allowed to redirect users back to. If your staging environment is located at [https://staging.example.com](https://staging.example.com) and your production app is at [https://example.com](https://example.com) each will need separate API keys.


## Local development without GitHub API keys

Local development is an important part of developing apps rapidly. Waiting for the deployment process can take minutes. This will drastically slow you down if you deploy your app to test every minor change. It is possible and often desirable to set up full OAuth even for your testing environment to reduce the difference between these environments. But to start with, it is nice to skip the GitHub dashboard clicking and get right to building. If no environment variables and Keys for OAuth are provided, the authentication code uses a mock endpoint to simulate the 3rd party provider. This mock endpoint uses `/_mock-oauth`. This code is not critical to the authentication. It can be removed. It is important to note that this mock behavior provides no real security and should not be substituted for a trusted 3rd party provider.


## GitHub Login Button

The first step to logging in with OAuth is to set up a link to serve to the user that will initiate the authentication.
The function below will generate the necessary login URL.

<begin-code filename="/app/auth-shared/oauth-href.mjs">

```javascript
const isLocal = process.env.ARC_ENV === 'testing'
const useMock = !process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET
const domain = isLocal ? process.env.DOMAIN_NAME || 'http://localhost:3333' : process.env.DOMAIN_NAME
let urls
if (isLocal && useMock) {
  urls = {
    authorizeUrl: `${domain}/_mock-oauth/login`,
    redirectUrl: `${domain}/oauth`,
  }
} else {
  urls = {
    authorizeUrl: process.env.OAUTH_AUTHORIZE_URL,
    redirectUrl: `${domain}/oauth`,
  }
}
export default function loginHref({ redirectAfterAuth = '/', newRegistration = '' }) {

  let oauthState = { redirectAfterAuth }
  if (newRegistration) oauthState = { redirectAfterAuth, newRegistration };

  const redirectUrlPart = urls.redirectUrl
    ? `&redirect_uri=${encodeURIComponent(urls.redirectUrl)}`
    : ''
  return `${urls.authorizeUrl}?client_id=${process.env.OAUTH_CLIENT_ID
  }${redirectUrlPart}${redirectAfterAuth
    ? `&state=${encodeURIComponent(
      JSON.stringify(oauthState)
    )}`
    : ''
  }`
}
```

</begin-code>

It uses the `DOMAIN_NAME` and `OAUTH` environment variables to create the required URL. It also points authentication to the mock routes if the app is local and not configured with a provider. The function can be imported in any API handler route, as shown below, to create this “Log in with GitHub” URL.

<begin-code>

```javascript
import loginHref from '../../auth-shared/login-href.mjs'
```

</begin-code>

## OAuth log in

When login is initiated using the link to GitHub, the flow falls under the control of GitHub. If that GitHub login is successful, GitHub returns a `code` token to the user and redirects them to the server. The code below shows the handler for that endpoint. If that `code` is in the request as a query parameter, the server will attempt to verify it with GitHub.

<begin-code filename="/app/api/login/oauth.mjs">

```javascript
import { getAccounts } from '../../../models/accounts.mjs'
import verifyOauth from '../../../auth-shared/oauth-verify-code.mjs'

export async function get(req) {
  const { redirectAfterAuth:sessionRedirectAfterAuth = '' } = req.session
  const { query: { code, state } } = req

  if (!code){
    return {
      location: '/login'
    }
  }

  if (code) {
    let redirectAfterAuth
    try {
      if (state) {
        const parseState = JSON.parse(state)
        redirectAfterAuth = parseState.redirectAfterAuth
      }
    // eslint-disable-next-line no-empty
    } catch (e) { }
    const redirect = redirectAfterAuth || sessionRedirectAfterAuth || '/'
    try {
      const oauthAccount = await verifyOauth(code)
      if (!oauthAccount.oauth.github) throw Error('user not found')
      const accounts = await getAccounts()
      const appUser = accounts.find(a =>
        a.provider?.github?.login === oauthAccount?.oauth?.github?.login &&
        a.authConfig?.loginWith?.github
      )
      const { password: removePassword, ...sanitizedAccount } = appUser ||
        {}
      const accountVerified = appUser?.verified?.phone ||
        appUser?.verified?.email

      if (!appUser) {
        return {
          location: '/login'
        }
      }
      if (!accountVerified){
        return {
          session: {
            redirectAfterAuth: redirect,
            unverified:sanitizedAccount
          },
          location: '/verify'
        }
      }
      return {
        session:{authorized:sanitizedAccount},
        location: redirect
      }

    } catch (err) {
      return {
        statusCode: err.code,
        body: err.message
      }
    }

  }
}
```

</begin-code>


The function to verify the `code` token on GitHub is shown below. It first makes a POST request to exchange that `code` for a longer lived token. The server then uses that token to make a GET request for the profile information that the user has approved. In this example, only the `login` property is kept from the profile to identify the user account on your website.

<begin-code filename="/app/auth-shared/oauth-verify-code.mjs">


```javascript
import tiny from 'tiny-json-http'
const isLocal = process.env.ARC_ENV === 'testing'
const useMock = !process.env.OAUTH_CLIENT_ID || !process.env.OAUTH_CLIENT_SECRET
const domain = isLocal ? process.env.DOMAIN_NAME || 'http://localhost:3333' : process.env.DOMAIN_NAME
let urls
if (isLocal && useMock) {
  urls = {
    authorizeUrl: `${domain}/_mock-oauth/login`,
    redirectUrl: `${domain}/oauth`,
    tokenUrl: `${domain}/_mock-oauth/token`,
    userInfoUrl: `${domain}/_mock-oauth/user`,
  }
} else {
  urls = {
    authorizeUrl: process.env.OAUTH_AUTHORIZE_URL,
    redirectUrl: `${domain}/oauth`,
    tokenUrl: process.env.OAUTH_TOKEN_URL,
    userInfoUrl: process.env.OAUTH_USERINFO_URL,
  }
}

export default async function oauth(code) {
  const data = {
    code,
    client_id: process.env.OAUTH_CLIENT_ID || '',
    client_secret: process.env.OAUTH_CLIENT_SECRET || '',
    redirect_uri: urls.redirectUrl,
  }
  let result = await tiny.post({
    url: urls.tokenUrl,
    headers: { Accept: 'application/json' },
    data
  })
  let token = result.body.access_token
  let userResult = await tiny.get({
    url: urls.userInfoUrl,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json'
    }
  })

  const {login, ...rest} = userResult.body
  return {
    oauth: { github: {login} }
  }
}
```

</begin-code>



## Registration

New users registering with OAuth do not need to provide a username and password. In the example app they provide a display name and an email address or phone number as a means of resetting their account.


![OAuth Registration](/_public/blog/post-assets/oauth/oauth-register.png)



## Other OAuth providers

OAuth is an industry-standard [specification](https://oauth.net/2/). Most of this example code will work for any provider. There are however slight variations in the token exchange where the `code` is verified in exchange for a token to access user profiles. Tests are especially important when reimplementing this code with other providers.


## Try it out

The code for the full example can be found at [github.com/enhance-dev/enhance-auth](https://github.com/enhance-dev/enhance-auth). Try out the deployed [example using GitHub OAuth](https://enhanceauth.com).


## Next Step

This is the final post in the authentication series. The full example shows a complete solution that can be modified for most websites. Looking ahead there are a few features that would be nice to add. [Passkeys](https://passkeys.dev/) are a popular topic with browser vendors promoting them as the password killer of the future. We will add support for Passkeys when they become widely supported. In the meantime, Pull Requests are welcome at [github.com/enhance-dev/enhance-auth](https://github.com/enhance-dev/enhance-auth).
