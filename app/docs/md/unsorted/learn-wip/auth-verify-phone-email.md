
---
title: Verify email and phone for new accounts
image: "/_public/blog/post-assets/padlock-on-keyboard.jpeg"
image_alt: "Padlock on a keyboard"
photographer: "FLY:D"
photographer_url: "https://unsplash.com/@flyd2069?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: enhance, authentication
description: "Verify a phone number or email address as a method for account recovery"
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
twitter: "ryanbethel"
mastodon: "@ryanbethel@indieweb.social"
published: "June 1, 2023"
series: "Enhance Auth"
---

Having a verified way to communicate with account owners is critical for most applications.
It is the best way to recover account access if a password is lost or forgotten.
In our previous authentication posts, we covered [Why you should roll your own auth](https://begin.com/blog/posts/2023-05-10-why-you-should-roll-your-own-auth) and [Authentication for a username and password flow](https://begin.com/blog/posts/2023-05-26-password-username-auth-flow).
This third installment of the series focuses on account verification with an email or phone number.


## TL&DR

1. An email or phone number is given at registration.
2. Using SendGrid, an email is sent with a verification link.
3. Using Twilio, a one time code is sent as an SMS message.
4. The account is verified as soon as one of those links/codes is used.
5. At login, if the user forgets their password, they can click “forgot password”.
6. They will receive a password reset link to recover the account.

Now, let's deep-dive into each of these components.


## Lego not Ikea

Think of this authentication series as more like Lego, less like Ikea.
Ikea furniture has detailed instructions for only one outcome, Lego gives flexibility to choose the parts you want for different outcomes.
Although we include both phone and email options, often, email is enough.
SMS has some vulnerabilities that make it less secure than email.
These are building blocks; use only what you need.

![Lego not Ikea](/_public/blog/post-assets/lego-not-ikea.png)

## Twilio and SendGrid

Software projects require constant build versus buy decisions.
This series started by making the case that you should build your own authentication rather than buy it from a third party.
But here, we use [SendGrid](https://sendgrid.com/) and [Twilio](https://www.twilio.com/en-us) for email and phone messages.
Email deliverability is a [significant challenge](https://repost.aws/knowledge-center/ses-email-flagged-as-spam).
The likelihood of your messages being seen by users is much higher with a reputable email service.
And the only practical way to send SMS messages is to connect to the network through a third party.

Both these services have a limited free tier so you can try them more easily.
Note that for Twilio this demo uses their [Verify API](https://www.twilio.com/docs/verify/api).
It is built for this purpose and it handles the logic of sending and verifying the one time codes.


Your mileage may vary.
But in general, the cost and complexity of adding third party dependencies only grows with time, so it is still best to avoid them when possible.



## Environment variables

Configuring the services requires five environment variables.
For SendGrid, an API key is needed as well as the email address that will be used as sender for messages.
Twilio has an API token and an account service ID.
The SMS messages come from a Twilio verified number.
The test phone number is where the SMS messages will be sent during local development.
That means you can register accounts with fake phone numbers and the SMS code will all be sent to this phone number.


<begin-code filename="/.env">

```bash
SENDGRID_API_KEY=key
TRANSACTION_SEND_EMAIL=me@example.com
TWILIO_API_ACCOUNT_SID=key
TWILIO_API_TOKEN=key
SMS_TEST_PHONE=+15555551111
```

</begin-code>


## Local development without API keys

Local development is valuable for testing business logic and iterating quickly.
This demo is written so that the code functions in local dev even with no API keys.
Without them, the app will print the email validation link and SMS one time codes to the console.
This makes it easier to add authentication to an app during the earliest stages of development.
Then when the app is ready to be deployed, real API keys can be added.



## Email verification

When a user registers with an email address, a unique verification link is sent.
When the link is clicked a success message confirms that their account is verified.
The database entry for that account is updated to reflect that the account has been verified.


![Success message for validating email address](/_public/blog/post-assets/verify-email.png)


The handler below is on the `/verify` route.
After submitting registration, the unverified user info is added to the session and redirected here.
This endpoint initiates the verification of email, phone, or both.


<begin-code filename="/app/api/verify/index.mjs">

```javascript
import {sendCode} from '../../auth-shared/sms-code-verify.mjs'
import sendLink from '../../auth-shared/send-email-link.mjs'

export async function get(req){
  const session = req.session
  const { unverified, authorized, redirectAfterAuth = '/', ...restSession } = session
  let phone,email,phoneVerified,emailVerified
  if (unverified) {
    phone = unverified.phone
    email = unverified.email
    phoneVerified = unverified.verified?.phone
    emailVerified = unverified.verified?.email
    const verifyPhone = phone && !phoneVerified
    const verifyEmail = email && !emailVerified
    if (verifyEmail){
      // send verification link
      await sendLink({
        email,
        redirectAfterAuth,
        subject:'Enhance Auth Verify Email Link',
        linkPath:'/verify/email'
      })
      if (!verifyPhone){
        return {
          location: '/verify/waiting-email'
        }
      }
    }
    if (verifyPhone){
      // send SMS code
      const { smsVerify, unverified, authorized} = req.session

      const serviceSid = await sendCode({
        phone,
        friendlyName:'Enhance Auth Verify Phone'
      })

      const newSession = { ...req.session }
      newSession.smsVerify = {otp:{ serviceSid }}

      return {
        session: newSession,
        location: '/verify/phone'
      }
    }
  } else if (authorized) {
    phone = authorized.phone
    email = authorized.email
    phoneVerified = authorized.verified?.phone
    emailVerified = authorized.verified?.email
    return {
      json:{
        verifyPhone:phone && !phoneVerified,
        verifyEmail:email && !emailVerified
      }
    }
  }
}
```

</begin-code>


The function below sends the verification link using the SendGrid API.
It sets a reference to the token being sent with some meta data so that when the link is clicked the server can continue verifying the account.
A key difference with the email link verification vs.
the phone is that when the email verification link is clicked, it opens in a new browser window, and therefore starts with a new session.

<begin-code filename="/app/auth-shared/send-email-link.mjs">

```javascript
import crypto from 'crypto'
import db from '@begin/data'
import sgMail from '@sendgrid/mail'

export default async function sendLink({ email, subject='', text, html, linkPath, redirectAfterAuth = '/', newRegistration = false }){
  const isLocal = process.env.ARC_ENV === 'testing'
  const requiredEnvs = process.env.TRANSACTION_SEND_EMAIL && process.env.SENDGRID_API_KEY
  const domain = process.env.DOMAIN_NAME || 'http://localhost:3333'
  const verifyToken = crypto.randomBytes(32).toString('base64')
  const link = `${domain}${linkPath}?token=${encodeURIComponent(verifyToken)}`

  const ttl = Date.now() + 60*60*1000
  await db.set({ table: 'session', key: verifyToken, verifyToken,
    email, redirectAfterAuth, newRegistration, linkUsed:false, ttl})


  // Local Development Testing Setup
  if (isLocal) {
    console.log(`${subject}: ${link}`)
  }

  if (requiredEnvs) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    let toEmail = email
    if(isLocal) toEmail = process.env.TRANSACTION_SEND_EMAIL;
    const msg = {
      to: toEmail,
      from: `${process.env.TRANSACTION_SEND_EMAIL}`,
      subject,
    }

    if (text) {
      msg.text = text(link)
    } else if (html) {
      msg.html = html(link)
    } else {
      msg.text = `${subject}: ${link}`
    }

    try {
      await sgMail.send(msg)
    } catch (e) {
      console.error(e)
      console.error(e.response.body.errors)
    }
  } else {
    console.log('TRANSACTION_SEND_EMAIL and SENDGRID_API_KEY needed to send')
  }

  return verifyToken
}
```

</begin-code>

Once email verification is initiated, the server redirects to the `/verify/email` route.
The handler for that route is below.
It checks the status of the verification and shows a success or waiting message.


<begin-code filename="/app/verify/email.mjs">

```javascript
import db from '@begin/data'
import { getAccounts, upsertAccount } from '../../models/accounts.mjs'

/**
 * @type {import('@enhance/types').EnhanceApiFn}
 */
export async function get(req) {
  const token = req.query?.token
  const { authorized, unverified, ...newSession } = req.session

  if (token) {
    const verifySession = await db.get({ table: 'session', key: token })
    const { linkUsed } = verifySession
    const linkExpired = verifySession?.ttl < Date.now()

    if (!verifySession || linkUsed || linkExpired) return  { location: '/verify/expired' };

    await db.set({ ...verifySession, table: 'session', key: token, linkUsed: true })
    let accounts = await getAccounts()
    let account = accounts.find(acct => verifySession.email === acct.email)

    if (!account) return { location: '/login' };

    account.verified = account.verified ? {...account.verified , email:true} : {email:true}
    account = await upsertAccount({ ...account })
    return {
      session: {},
      location: '/verify/success-email'
    }

  } else if (unverified) {
    let accounts = await getAccounts()
    let account = accounts.find(acct => unverified.email === acct.email )
    const accountVerified = account.verified?.email

    if (!account) return {location: '/login'};
    if (accountVerified) {
      return {
        session: {},
        location: '/verify/success-email'
      }
    }

    const { redirectAfterAuth = '/' } = req.session

    await sendLink({ email: account.email, subject:'Enhance Auth Verify Email Link', linkPath:'/verify/email', redirectAfterAuth })

    return {
      session: {},
      location: '/verify/waiting-email'
    }

  } else if (authorized) {
    if (authorized.verified?.email===true){
      return {
        location: '/verify/success-email'
      }
    } else {
      return { location: '/verify/success-email' }
    }

  } else {
    return {
      location: '/login'
    }
  }
}
```

</begin-code>


## Phone verification

When an account is registered with a phone number, the unverified account info is added to the session and the browser is redirected to `/verify` .
A one time code is sent to the phone number, and the user is then prompted to enter this code.



![Form for validating phone number](/_public/blog/post-assets/verify-phone.png)


The function below uses the Twilio Verify API to send the one time code.
Note that if you are in a local development environment and the environment variables are not present, the API is bypassed and a code is sent to the console.

<begin-code filename="/app/auth-shared/sms-code-verify.mjs">

```javascript
import twilio from "twilio"
const accountSid = process.env.TWILIO_API_ACCOUNT_SID
const authToken = process.env.TWILIO_API_TOKEN
const isLocal = process.env.ARC_ENV === 'testing'
const requiredEnvs = (process.env.TWILIO_API_ACCOUNT_SID && process.env.TWILIO_API_TOKEN)

export async function sendCode({phone,friendlyName}){
  let service
  if (requiredEnvs){
    const toPhone = isLocal ? process.env.SMS_TEST_PHONE : '+1'+phone.replace('-','')
    const client = twilio(accountSid, authToken)
    service = await client.verify.v2.services.create({
      friendlyName,
    });
    await client.verify.v2.services(service.sid).verifications.create({
      to: toPhone,
      channel: 'sms',
    });

    if (!process.env.SMS_TEST_PHONE) console.log('Warning: SMS messages will be sent to phone numbers unless SMS_TEST_PHONE is set');
  } else {
    console.log('Missing required environment variables')
    if (isLocal){
      console.log('Use simulated One Time Password "123456" for testing')
      service = {sid:'simulated-testing'}
    }
  }
  return service.sid
}

export async function verifyCode({phone, serviceSid, smsCode }){
  let verification, status
  if (requiredEnvs){
    const toPhone = isLocal ? process.env.SMS_TEST_PHONE : '+1'+ phone.replace('-','')
    const client = twilio(accountSid, authToken)
    verification= await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: toPhone, code: smsCode })
    status = verification.status
  } else {
    console.log('Missing required environment variables')
    if (isLocal){ status = smsCode === '123456' ? 'approved' : false }
  }
  return status
}
```

</begin-code>

The following is the handler for `/verify/phone` .
This handles the forms for entering the code and success messages once verified.


<begin-code filename="/app/api/verify/phone.mjs">

```javascript
import { sendCode, verifyCode } from "../../auth-shared/sms-code-verify.mjs"
import { getAccount, upsertAccount } from "../../models/accounts.mjs"

export async function get(req) {
  const { redirectAfterAuth = '/' } = req.session
  const { smsVerify, unverified, authorized } = req.session
  const {otp } = smsVerify || {}
  const phoneVerified = authorized?.verified?.phone || unverified?.verified?.phone

  if (!authorized && !unverified) {
    return {
      location: '/login'
    }
  }
  if (phoneVerified) {
    return {
      location:'/verify/success-phone'
    }
  }
  return {
    json: { otpSent: !!(otp?.serviceSid) },
  }
}

export async function post(req) {
  const { otpCode, request } = req.body
  const { smsVerify, unverified, authorized} = req.session
  const { otp } = smsVerify || {}
  const phoneVerified = authorized?.verified?.phone || unverified?.verified?.phone
  const phone= authorized?.phone || unverified?.phone

  if (request && phone) {

    const serviceSid = await  sendCode({phone, friendlyName:'Enhance Auth Verify Phone'})
    const newSession = { ...req.session }
    newSession.smsVerify = {otp:{ serviceSid }}

    return {
      session: newSession,
      location: '/verify/phone'
    }
  }
  if (otpCode) {
    const { serviceSid } = otp

    const status = await verifyCode({phone, serviceSid, smsCode:otpCode})

    if (status === 'approved') {
      let { smsVerify, unverified, authorized, ...newSession } = req.session
      let key = authorized?.key || unverified?.key
      let account = await getAccount(key)
      let match = account?.phone === phone
      let verified = account?.verified
      if (!match) {
        return {
          session: {},
          location: '/login'
        }
      }

      if (verified) {
        account.verified.phone = true
      } else {
        account.verified = {phone:true}
      }

      if (match) {
        let result = await upsertAccount(account)
        let {password:removePassword, ...newAccount} = result

        const redirectAfterAuth = req.session.redirectAfterAuth || '/'
        return {
          session: { ...newSession, authorized:newAccount },
          location: redirectAfterAuth
        }
      }
    }
  }
  return {
    location: '/verify/phone'
  }
}
```

</begin-code>


## Forgot Password

With a verified account, users can recover if a password is lost or forgotten.
On the login screen there is a “Forgot password” link that initiates this process.
After entering their phone or email address, a link or one time code is generated.


## Next steps

Now that we have a fully verified account we have the option to allow users to login directly with just their email or phone number.
We will cover using these magic links in the next post.
To try out this code [here is an example deployed on Begin](https://meadow-yvg.begin.app/).
You can register an account to try resetting your password.
Note that in this deployed example accounts are automatically deleted from the database after a day.
The code for the full example can be found on GitHub at [https://github.com/enhance-dev/enhance-auth](https://github.com/enhance-dev/enhance-auth).

