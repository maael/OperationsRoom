import createLogger from '../lib/middleware/logger'
import indexController from './components/index/controller'
const express = require('express')
const router = express.Router()

export default function createRouter () {
  router.use(createLogger('site'))

  indexController(router)
  return router
}
