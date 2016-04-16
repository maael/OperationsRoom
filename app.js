import xFrameOptions from './lib/middleware/x-frame-options'
import { router as adminServer } from './admin/server'
import { router as apiServer } from './api/server'
import { router as siteServer } from './site/server'

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(xFrameOptions())
app.use('/admin', adminServer)
app.use('/api', apiServer)
app.use('/', siteServer)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
