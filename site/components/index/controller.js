import IndexView from './views/index'
export default function indexController (router) {
  router.get('/', (req, res) => {
    let view = new IndexView()
    res.send(view.render())
  })

  router.get('/welcome', (req, res) => {
    res.send('welcome')
  })
}
