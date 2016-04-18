import xFrameOptions from './lib/middleware/x-frame-options'
import initializeDatabase from './lib/database'
import adminServer from './admin/server'
import apiServer from './api/server'
import siteServer from './site/server'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(xFrameOptions())
initializeDatabase()
  .then((database) => {
    app.use('/admin', adminServer(database))
    app.use('/api', apiServer(database))
    app.use('/', siteServer())
  })
  .catch((err) => { throw err })

app.listen(port, () => {
  console.log(`Admin: http://localhost:${port}/admin`)
  console.log(`Api: http://localhost:${port}/api`)
  console.log(`Site: http://localhost:${port}/`)
})
