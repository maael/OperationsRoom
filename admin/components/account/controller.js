import isLoggedIn from '../../lib/middleware/is-logged-in'
import createFirstAdmin from '../../lib/middleware/create-first-admin'
import LoginView from './views/login'
import AccountView from './views/account'
import attachPassport from './lib/passport'

export default function accountController (router) {
  /* to add to /login route */
  const firstAdmin = createFirstAdmin(router)

  attachPassport(router)

  router.get('/', isLoggedIn, (req, res) => {
    res.send('Admin')
  })

  router.get('/login', (req, res) => {
    let view = new LoginView()
    view.render().then(view.send(res))
  })

  router.get('/account', isLoggedIn, (req, res) => {
    let view = new AccountView()
    view.render({ user: req.user }).then(view.send(res))
  })

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/admin/login')
  })

  router.get('/create', () => {
    console.log('creating first admin')
  })
}
