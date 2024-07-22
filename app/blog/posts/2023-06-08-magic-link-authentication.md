---
title: Authentication with Magic links
image: "/_public/blog/post-assets/magic-links/magic-trick.jpeg"
image_alt: "Magic Trick"
photographer: "Edson Junior"
photographer_url: "https://unsplash.com/@roinuj16?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: enhance, authentication
description: "Authenticating with only an email or phone number can simplify the process significantly. This post demonstrates how to use these Magic links with Enhance."
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
twitter: "ryanbethel"
mastodon: "@ryanbethel@indieweb.social"
published: "June 8, 2023"
series: "Enhance Auth"
---



Websites should be secure.
They should also be easy to use.
These requirements seem at odds with many development decisions.
Magic links are a popular authentication method that uses email (or phone) links to log in directly to a site.
They are a good compromise between security and ease of use for most applications.
This fourth installment of the series shows how to use magic links with Enhance and discusses some of the tradeoffs.



## TL&DR

All of the pieces are already in place to log in with magic links.
The previous posts covered registering a new user and verifying email address or phone number by sending links or codes.
All that remains is to:



1. Add a login form that asks for just the email or phone number to log in.
2. Send a unique link to that email or a code to that phone number using the same process as verification.
3. Once the link is clicked or the code is entered, the session is updated and the user is logged in.



## Magic Link Login

One of the best features of this login is that it requires only a single input field.

![log in with magic link](/_public/blog/post-assets/magic-links/login-magic-link.png)


After clicking on the link received by email, the server verifies the link.
If it is valid, the session is updated to log the user in.
They will then immediately see the following screen confirming they are authenticated.
That is it.






![Log in success](/_public/blog/post-assets/magic-links/login-success.png)


The code for this login handler is below.
This endpoint serves the form for entering an email address with an ordinary GET request.
A POST request with that email will trigger a link to be sent by email.
That link will return here with a token as a query parameter which can be verified.
If that token is valid, the associated account is added to the session, and the user is logged in.


<begin-code filename="/app/api/login/magic-link.mjs">

```javascript
import sendLink from '../../auth-shared/send-email-link.mjs'
import db from '@begin/data'
import { getAccounts } from '../../models/accounts.mjs'

export async function get(req) {
  const token = req.query?.token
  const { problems, login, ...newSession } = req.session
  if (problems) {
    return {
      session: newSession,
      json: { problems, login }
    }
  }

  if (!token) return

  if (token){
    const verifySession = await db.get({ table: 'session', key: token })
    const {linkUsed}=verifySession
    const linkExpired = verifySession?.ttl < Date.now()
    if (!verifySession || linkUsed || linkExpired) { 
      return { location:'/login/link-expired' } 
    }

    await db.set({
      ...verifySession, 
      table: 'session', 
      key: token, 
      linkUsed: true  
    })

    let accounts, account
    try {
      accounts = await getAccounts()
      account = accounts.find(i => i.email === verifySession.email && 
        i.authConfig?.loginWith?.email)
    }
    catch (e) {
      console.log(e)
    }

    if (!account) { return {location:'/login/magic-link'} }

    const accountVerified = account?.verified?.email
    const { password: removePassword, ...sanitizedAccount } = account

    if (!accountVerified) {
      return {
        session: {
          redirectAfterAuth:verifySession?.redirectAfterAuth || '/', 
          unverified: { ...sanitizedAccount } 
        },
        location: '/verify'
      }
    }
    return {
      session: { authorized: { ...sanitizedAccount } },
      location: verifySession?.redirectAfterAuth || '/'
    }
  }

}

export async function post(req) {
  const session = req?.session
  const {email} = req.body
  const { redirectAfterAuth = '/' } = session

  if (!email){
    return {
      session: {...session, problems:{form:'No Email Address'}},
      location: '/login/magic-link'
    }
  } 

  if (email) {
    const accounts = await getAccounts()
    const account = accounts.find(a => a.email === email && 
      a.verified?.email && 
      a.authConfig?.loginWith?.email)
    if (account) { 
      await sendLink({ email, subject:'Enhance Auth Login Link',
        linkPath:'/login/magic-link', redirectAfterAuth })
    }
    return {
      location: '/login/wait-link'
    }
  } 
} 
```

</begin-code>


## Magic code/SMS

As discussed in the previous post, [SMS messages are not as secure](https://www.forbes.com/sites/zakdoffman/2020/10/11/apple-iphone-imessage-and-android-messages-sms-passcode-security-update) as email addresses.
For this reason, allowing users to log in with just a phone number is also less secure.
There are situations where this might be a reasonable tradeoff.
It may be fine, for example, as a login to a survey to ensure that each user only submits one response.
The form below is the log in by phone example.


![log in with phone number](/_public/blog/post-assets/magic-links/login-magic-code.png)

In this case, a one-time code is sent to the phone number and a new form is presented in the browser for entering that code.
After the one-time code is submitted, the user is logged in and receives the same confirmation message as in the magic link. 


![enter magic code](/_public/blog/post-assets/magic-links/login-enter-code.png)

## Email only streamlined registration

One advantage of the magic link is a more streamlined login experience.
In some cases, you might want to streamline registration also.
An email (or phone number) might be the only piece of information needed from the user.
There are two options for this.
First is to remove everything from the registration form except for the email or phone number.
Another option is to drop the registration altogether.
If a new email is submitted for login, it can be registered as a new user then.


## Try it out

The code for the full example can be found at [github.com/enhance-dev/enhance-auth](https://github.com/enhance-dev/enhance-auth).
Try out the deployed [example using magic link login](https://play-n8x.begin.app).



## Next Step

The next post in this series will cover how to do social login.
It is another popular option that can streamline logging in down to a single click.

