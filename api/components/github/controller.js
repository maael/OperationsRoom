export default function githubController (router) {
  router.get('/github/repos/list', (req, res) => {
    res.json({ success: true })
  })
}
