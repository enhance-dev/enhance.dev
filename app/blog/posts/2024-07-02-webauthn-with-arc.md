---
title: "WebAuthn: Enhancing Security with Minimal Effort"
image: "/_public/blog/post-assets/webauthn-padlock-comic.jpg"
image_alt: "A comic-style padlock smiling."
series: "Enhance Auth"
category: architect
description: "WebAuthn offers a passwordless approach to security that's both robust and user-friendly. It's already built in to all major browsers and implementation isn't a ton of work - especially if you use Architect."
author: "Taylor Beseda"
avatar: "tbeseda.jpg"
mastodon: "@tbeseda@indieweb.social"
published: "July 2, 2024"
---

Secure authentication on the web is more crucial than ever. [WebAuthn](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) is an authentication API that's already built into all major browsers. Based on the [W3C](https://www.w3.org/TR/webauthn/)/[FIDO2](https://fidoalliance.org/fido2-2/fido2-web-authentication-webauthn/) specification, WebAuthn offers a passwordless approach to security that's both robust and user-friendly.

[Passkeys](https://passkeys.dev/), a software-based implementation of WebAuthn, are [gaining traction](https://techcrunch.com/2024/05/02/google-brings-passkey-support-to-its-advanced-protection-program-ahead-of-the-us-presidential-election/) across the web. There are some new APIs to learn, but don't fear the implementation.

## Why Choose WebAuthn?

1. **Enhanced Security**: WebAuthn uses public-key cryptography, with the private key secured by a second factor like USB keys or biometric scanners. Compared to traditional passwords, passkeys are significantly more resistant to phishing and credential stuffing attacks.
2. **Improved User Experience**: No more forgotten passwords or awkward password managers + generators. Users can authenticate quickly and easily using methods they're already familiar with, like fingerprint sensors or facial recognition.
3. **Cross-Platform Compatibility**: Passkeys can be synced across devices by providers like Apple, Google, and Microsoft. This offers a balance between security and convenience.
4. **Relatively Easy Implementation**: Contrary to what service providers might have you believe, implementing WebAuthn isn't much more effort than traditional password-based authentication.

I won't dive too much deeper into the spec, but if you'd like to read more, Okta has a great [introduction to WebAuthn](https://auth0.com/blog/webauthn-a-short-introduction/).

## Implementation

Here's a high-level look at how WebAuthn works:

1. **Registration**: The server sends a (usually random) challenge to the client. The client's authenticator creates a new key pair and sends the public key to the server along with other registration data.
2. **Authentication**: The server sends a new challenge. The client signs this challenge with the private key and sends the signature back. The server verifies the signature using the stored public key.

Let's look at a simple implementation using Node.js and HTML + JavaScript. For this demo we will start with the registration process. We'll create two routes: `/register/options` and `/register/verify` and leverage some helpers from [SimpleWebAuthn](https://simplewebauthn.dev/).

Starting with a small HTML form to kick off the registration process:

```html
<!-- browser -->
<form method="POST" action="/register/options">
  <label for="username">Choose a Username</label>
  <input type="text" name="username" required>
  <button type="submit">Register</button>
</form>
```

Our server will handle the POST by generating registration options and a challenge via `@simplewebauthn/server`. This package provides a simple API for generating registration and authentication options:

```javascript
// Node.js server
import { generateRegistrationOptions } from '@simplewebauthn/server'

export async function handler({ body, session }) {
  const { username } = body
  const options = await generateRegistrationOptions({
    // "rp" stands for Relying Party, which is the server
    rpName: 'My App',
    rpID: 'example.com',
    userID: new Uint8Array(Buffer.from(username)),
    userName: username,
    attestationType: 'indirect',
    authenticatorSelection: {
      userVerification: 'required',
    },
    supportedAlgorithmIDs: [-7, -257],
  })

  // Store the challenge in the session for verification
  session.challenge = options.challenge

  return {
    session,
    json: { options },
  }
}
```

The handler above responds with JSON, but you could also return HTML with the serialized JSON for use in a script tag.

In the browser, we'll invoke `startRegistration` from `@simplewebauthn/browser` with our generated `options`. This is where the user interacts with their authenticator or creates a passkey:

```html
<!-- browser -->
<script type="module">
  import { startRegistration } from '@simplewebauthn/browser'

  // ...previous work to send form and create "options"
  
  const attestationResponse = await startRegistration(options)

  const verifyResponse = await fetch('/register/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: options.user.name,
      attestationResponse,
    }),
  })

  // if registration was successful, redirect to root
  if (verifyResponse.ok) window.location.replace('/')
  else alert('Registration failed!')
</script>
```

On the server, we'll verify the registration data with `@simplewebauthn/server`. If the verification passes, we can store the user's credential in the database and return `success`:

```javascript
// Node.js server
import { verifyRegistrationResponse } from '@simplewebauthn/server'

export async function handler({ body, session }) {
  const { username, attestationResponse } = body
  const { challenge: expectedChallenge } = session

  const verification = await verifyRegistrationResponse({
    response: attestationResponse,
    expectedChallenge,
    expectedOrigin: 'http://example.com',
    expectedRPID: 'example.com',
  })

  if (!verification.verified) throw new Error('Verification failed!')

  const { credentialID, credentialPublicKey } = verification.registrationInfo
  const credential = {
    id: credentialID,
    publicKey: Buffer.from(credentialPublicKey).toString('base64'),
  }
  const newUser = { username, credential }
  
  // TODO: store the user + credential in the database
  session.user = { username }

  return {
    session,
    json: { success: true, user: { username } },
  }
```

This is a basic example of how to implement WebAuthn registration. The authentication process is similar, but instead of generating registration options, you'll generate authentication options and verify the response.

You can try the full implementation in the [demo application](https://friend-mjg.begin.app) and see my source code in the [GitHub repository](https://github.com/architect-examples/arc-example-webauthn). The demo is built with [Architect](https://arc.codes) and leverages the out-of-the-box session management and database access.

## Concerns Around Passkeys and WebAuthn

While WebAuthn and passkeys offer significant benefits, there are naturally some concerns:

1. **User Adoption**: Some worry that users might resist a new authentication method. However, many users are already familiar with biometric authentication on their devices. Clear communication about the benefits and ease of use can help smooth the transition.
2. **Device Compatibility**: While WebAuthn is supported by all major browsers, some older devices might not be compatible. It's important to have fallback options, such as traditional password authentication or an OAuth provider.
3. **Account Recovery**: This is the biggest one. What if a user loses their device? Hopefully they've used a sync service and can restore their keys. If not, passkeys cannot be recreated and adding the usual email recovery option kind of defeats the purpose of adding the increased security of passkeys. It might be wise to allow a backup password/recovery key to be used once per lost private key.
4. **Privacy Concerns**: Some users might worry about the privacy implications of biometric data. It's crucial to communicate that with WebAuthn, biometric data never leaves the user's device. The server only receives and stores a public key.
5. **Implementation Complexity**: WebAuthn implementation might seem daunting, but many libraries and tools are available to simplify the process. The long-term benefits in security and user experience outweigh the initial lift.
6. **Cross-Platform Use**: Users might worry about accessing their accounts across different devices or platforms. Passkeys address this by allowing synchronization across devices, providing a seamless experience.

## Conclusion

WebAuthn represents a significant step forward in authentication technology. It offers enhanced security and improved user experience without significantly increasing implementation complexity. 

In the next part we'll [_*enhance*_](https://enhance.dev) the front end portion of the demo with a web component or two. In the meantime, let me know how you're using WebAuthn or if you have any questions about the implementation. You can find me on [Mastodon](https://indieweb.social/@tbeseda) or the [Arc Discord](https://discord.gg/y5A2eTsCRX).
