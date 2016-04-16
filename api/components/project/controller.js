export default function projectController (router) {
  router.post('/project/new', (req, res) => {
    router.models.project.create({ name: 'Test' }, (err, model) => {
      if (err) return res.json({ err: err }, 500)
      res.json(model)
    })
  })
}
