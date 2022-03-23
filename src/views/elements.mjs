import ErrorPage from './templates/error-page.mjs'
import ContentContainer from './templates/content-container.mjs'
import LoginPage from './templates/login-page.mjs'
import NavBar from './templates/nav-bar.mjs'
import PageHeader from './templates/page-header.mjs'
import LandingPage from './templates/landing-page.mjs'
import TabContainer from './templates/tab-container.mjs'
import EmailSignup from './templates/email-signup.mjs'
import EmailThankPage from './templates/email-thank-page.mjs'
import ComingSoon from './templates/coming-soon-page.mjs'
export default {
  'coming-soon': ComingSoon,
  'email-signup': EmailSignup,
  'email-thank-page': EmailThankPage,
  'content-container': ContentContainer,
  'error-page': ErrorPage,
  'login-page': LoginPage,
  'nav-bar': NavBar,
  'page-header': PageHeader,
  'landing-page': LandingPage,
  'tab-container': TabContainer
}
