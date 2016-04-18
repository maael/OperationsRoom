import isLoggedIn from '../../lib/middleware/is-logged-in'
import AddView from './views/add'

export default function projectController (router) {
  router.get('/projects/add', isLoggedIn, (req, res) => {
    let view = new AddView(req.user)
    view.render({ user: req.user }).then(view.send(res))
  })
}
