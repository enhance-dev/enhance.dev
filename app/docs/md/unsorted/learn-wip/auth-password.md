---
title: Authentication for a Username and Password flow
image: "/_public/blog/post-assets/combo-lock.jpg"
image_alt: "Combination Lock"
photographer: "regularguy.eth"
photographer_url: "https://unsplash.com/@moneyphotos"
category: enhance, authentication
description: "Build a username password authentication flow for an Enhance app"
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
twitter: "ryanbethel"
mastodon: "@ryanbethel@indieweb.social"
published: "May 26, 2023"
series: "Enhance Auth"
---


Passwords are the oldest form of authentication for shared systems.
There are many alternatives now that offer advantages, but sometimes a password is still the best fit.
This post explains how to set up password authentication for Enhance.

This is the second part of our series on authentication.
The goal is to build a complete authentication system one piece at a time.
The first post, [Why you should roll your own auth](https://begin.com/blog/posts/2023-05-10-why-you-should-roll-your-own-auth), makes a case for not outsourcing authentication to a third party.
Now we cover username/password authentication with secure sessions.


## TL&DR

Before anyone can login an account needs to be created.
1. [The registration form takes input for a new account.](#register-new-accounts)
2. [This input is validated by a registration endpoint.](#validation) 
3. [And stored as a new account in the database.](#storing-passwords)

![Registration Flow](/_public/blog/post-assets/registration-flow-diagram.png)

To login:
1. [The username and password are entered in a login form.](#login) 
2. [Posted to the server login endpoint.](#login)
3. [Checked against the database for a matching account.](#login)
4. [If a matching account is found, the details are stored in a user session.](#secure-sessions)

![Login Flow](/_public/blog/post-assets/login-flow-diagram.png)

Now let's break down each of those components.


## Secure Sessions

Secure sessions are the basis for authentication.
Enhance uses HTTP only cookies for sessions because this is the most secure approach.
It ensures no sensitive user information is stored on the client.
The cookie is sent with each request to the server.
The server can respond with the same cookie or modify it and send it that back with the response.
In this way the session persists as long as the user interacts with the site, or it is cleared by the server.
Refer to the [Bulletproof Sessions](https://begin.com/blog/posts/2023-02-03-bulletproof-sessions-with-httponly-cookies) post for more details on Enhance sessions.
After a user logs in, their account name and other details are attached to the session and used later to authenticate them when they make restricted requests.
This session data is securely encrypted so that it cannot be read or modified except on the server.
A long secret key is stored in an environment variable `ARC_APP_SECRET` to secure the sessions.


## Register New Accounts

Before anyone can login a new account needs to be created.
This is done with a plain HTML form sending a POST to the server.
Here is a [deployed example](https://meadow-yvg.begin.app/register/username).
Either a phone number or email is required to verify the account and as a recovery mechanism if the password is lost or forgotten.
The email and phone verification will be covered in the next blog post.

![Registration Form Screenshot](/_public/blog/post-assets/new-registration.png)


## Validation

The markup for the registration form is shown below (or in the source [repo on GitHub](https://github.com/enhance-dev/enhance-auth/blob/main/app/pages/register/username.mjs)).
To properly validate form data requires both client and server validation.
Client validation is the fastest way to catch small errors, but some things like uniqueness must be checked on the server.
Client validation should not be trusted because it can be bypassed easily.
If the server-side validation fails, the problems are returned along with the previous values entered so the user can pick up where they left off and fix any errors.
The details of this validation loop are explained in the [Progressively enhancing form submission with web components](https://begin.com/blog/posts/2022-08-25-progressively-enhancing-form-submissions-with-web-components) post.


<begin-code filename="/app/pages/register/username.mjs">

```javascript
export default function register({ html, state }) {
  const { problems, register } = state.store

  return html`
<enhance-page-container>
  <nav-menu></nav-menu>
  <main>
    <h1 class="mb1 font-semibold text2">Register a new Account</h1>
    <enhance-form action="/register/username" method="post">
      <div class="${problems?.form ? 'block' : 'hidden'}">
        <p>Found some problems!</p>
        <ul>${problems?.form}</ul>
      </div>
      <enhance-text-input
        label="Display Name"
        id="displayName"
        name="displayName"
        type="text"
        pattern="^[a-zA-Z0-9_\-]*$"
        maxlength="30"
        errors="${problems?.displayName?.errors}"
        value="${register?.displayName || ''}"
        required
      >
      </enhance-text-input>
      <enhance-text-input
        label="Username"
        id="username"
        name="username"
        type="text"
        pattern="^[a-zA-Z0-9_\-]*$"
        maxlength="30"
        errors="${problems?.username?.errors}"
        value="${register?.username || ''}"
        description="Numbers, letters, and underscores"
        required
      >
      </enhance-text-input>
      <enhance-text-input
        label="Password"
        id="password"
        name="password"
        type="password"
        minlength="8"
        errors="${problems?.password?.errors}"
        description="At least 8 characters"
        required
      >
      </enhance-text-input>
      <enhance-text-input
        label="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        minlength="8"
        errors="${problems?.confirmPassword?.errors}" 
        required
      >
      </enhance-text-input>
      <enhance-text-input
        label="Email"
        id="email"
        name="email"
        type="email"
        value="${register?.email || ''}"
        errors="${problems?.email?.errors}"
      >
      </enhance-text-input>
      <enhance-text-input
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        errors="${problems?.phone?.errors}"
        value="${register?.phone || ''}"
        description="Format: 123-456-7890"
      >
      </enhance-text-input>
      <enhance-submit-button style="float: right">
        <span slot="label">Register</span>
      </enhance-submit-button>
    </enhance-form>
  </main>
</enhance-page-container>
`}
```

</begin-code>



## Storing Passwords

When the form is submitted a post request is sent to the server.
One of the most critical parts of password authentication is properly handling passwords.
They need to be stored so they can be verified at login.
But they should also be stored so that if the account data is breached, the original passwords cannot be easily discovered.
The solution is to store a hashed and salted version of the password.
The hash is a one-way function that is very difficult and time-consuming to reverse.
See the OWASP cheatsheet on [hashing-vs-encryption](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#hashing-vs-encryption) for more information.
For hashing and salting, `bcrypt` is used with ten salting passes.
As an additional precaution if there are form validation problems, the password is not returned to the front end with the other form inputs.
It needs to be entered again to resubmit.
Below is the POST handler for creating a new account (or refer to the source [repo on GitHub](https://github.com/enhance-dev/enhance-auth/blob/main/app/api/register/username.mjs)).


<begin-code filename="/app/api/register/username.mjs">

```javascript
import bcrypt from 'bcryptjs'
import { validate } from '../../models/register-username.mjs'
import { upsertAccount } from '../../models/accounts.mjs'

export async function get(req) {
  let { problems, register, ...newSession } = req.session

  if (problems) {
    return {
      session: newSession,
      json: { problems, register }
    }
  }
}

export async function post(req) {
  const session = req?.session
  // eslint-disable-next-line no-unused-vars
  let { authorized: removedAuthorize,
    problems: removedProblems,
    register: removedRegister,
    unverified: removedUnverified,
    ...newSession } = session

  let { problems, register } = await validate.create(req)

  if (problems) {
    // eslint-disable-next-line no-unused-vars
    let { password:removedPassword, confirmPassword:removedConfirm, ...sanitizedRegister } = register
    return {
      session: { ...newSession, problems, register: sanitizedRegister },
      location: '/register/username'
    }
  }

  try {
    delete register.confirmPassword
    register.password = bcrypt.hashSync(register.password, 10)
    register.authConfig = { loginWith: {password:true, email:true, phone:true} }
    register.scopes = ['member']
    // eslint-disable-next-line no-unused-vars
    const { password: removePassword, ...newAccount } = await upsertAccount(register)

    return {
      session: { unverified: newAccount },
      location: '/verify'
    }
  }
  catch (err) {
    console.log(err)
    return {
      session: { ...newSession, error: err.message },
      location: '/register/username'
    }
  }

}
```



## Login

The login handler is shown below (or in the source [repo on GitHub](https://github.com/enhance-dev/enhance-auth/blob/main/app/api/login/username.mjs)).
A password and username submitted as a POST request.
They are then checked against the database to find a matching verified account.
If one is found an `authorized` object is added to the session to identify the account. 

<begin-code filename="/app/api/login/username.mjs">

```javascript
import bcrypt from 'bcryptjs'
import xss from 'xss'
import { getAccounts } from '../../models/accounts.mjs'
// Hardcoded admin account to bootstrap accounts.
// The password is defined in environment variables
const hardcodedAdmin = {
  username: 'hardcoded',
  scopes: ['admin'],
}

export async function get(req) {

  const { problems, login, ...newSession } = req.session
  if (problems) {
    return {
      session: newSession,
      json: { problems, login }
    }
  }
}

export async function post(req) {
  const session = req?.session
  const { password, username } = req.body
  const { redirectAfterAuth = '/' } = session

  if (!password || !username) {
    return {
      session: {
        problems: { form: 'Missing Username or Password' },
        login: {username:xss(username)}, redirectAfterAuth
      },
      location: '/login/username'
    }
  }

  // Hardcoded admin account to bootstrap accounts
  // To disable remove the HARDCODED_ADMIN_PASSWORD from environment variables
  if (process.env.HARDCODED_ADMIN_PASSWORD && username === hardcodedAdmin.username
    && password === process.env.HARDCODED_ADMIN_PASSWORD) {
      return {
        session: { authorized: hardcodedAdmin },
        location: redirectAfterAuth ? redirectAfterAuth : '/'
      }
    }

  let accounts = await getAccounts()
  const account = accounts.find(a => a.username === username &&
    a.authConfig?.loginWith?.username)
  const match = account ? bcrypt.compareSync(password, account?.password) : false
  const accountVerified = match ? !!(account.verified?.email || account.verified?.phone) : false
  const { password: removePassword, ...sanitizedAccount } = account || {}
  if (accountVerified) {
    return {
      session: { authorized: sanitizedAccount },
      location: redirectAfterAuth ? redirectAfterAuth : '/'
    }
  }
  if (match && !accountVerified) {
    return {
      session: { unverified: sanitizedAccount, redirectAfterAuth },
      location: '/verify'
    }
  }
  if (!match) {
    return {
      session: {
        problems: { form: 'Incorrect Username or Password' },
        login: {username:xss(username)}
      },
      location: '/login/username'
    }
  }
}
```

</begin-code>

## Hard coded accounts

One problem setting up an app is creating the first account with administrative permissions.
The new account registration form should only create regular accounts without admin permissions.
There are many ways to do this, but one option is to hard code a user into the app to start.
This is an alternative password authentication like that shown in [Bulletproof Sessions](https://begin.com/blog/posts/2023-02-03-bulletproof-sessions-with-httponly-cookies).
In this demo the username is `hardcoded` and the password is set with the environment variable `HARDCODED_ADMIN_PASSWORD`.
This account can be used in the admin dashboard to modify permissions of other accounts as needed.


## Next Step

After registering a new account the email or phone number must be verified.
This will be covered in the next blog post.
To see it in action [here is an example deployed on Begin](https://meadow-yvg.begin.app/).
You can register an account to try it out.
Note that in this deployed example accounts are automatically deleted from the database after a day.
The code for the full example can be found on GitHub at [https://github.com/enhance-dev/enhance-auth](https://github.com/enhance-dev/enhance-auth).

