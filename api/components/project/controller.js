export default function projectController (router) {
  router.post('/project/create', (req, res) => {
    router.database.models.project.create(req.body, (err, project) => {
      if (err) return res.json({ err: err }, 500)
      res.json(project)
    })
  })

  router.post('/project/list', (req, res) => {
    router.database.models.project.find({}, (err, projects) => {
      if (err) return res.json({ err: err }, 500)
      res.json(projects)
    })
  })
}
