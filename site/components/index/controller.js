import IndexView from './views/index'
export default function indexController (router) {
  router.get('/', (req, res) => {
    let view = new IndexView()
    view.render().then(view.send(res))
  })

  router.get('/welcome', (req, res) => {
    res.send('welcome')
  })
}
