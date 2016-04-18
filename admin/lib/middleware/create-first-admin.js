export default function createFirstAdmin (router) {
    return (req, res, next) => {
      router.database.models.user.count()
        .then((count) => {
          if (count) return next()
          res.redirect('/admin/create')
        })
        .catch((err) => {
          next(err)
        })
    }
}
