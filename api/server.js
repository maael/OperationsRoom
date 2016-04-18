import createLogger from '../lib/middleware/logger'
import projectController from './components/project/controller'
import githubController from './components/github/controller'
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const router = express.Router()

export default function createRouter (database) {
  router.database = database
  router.use(createLogger('api', '/api'))
  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())
  router.use(methodOverride())

  projectController(router)
  githubController(router)
  return router
}
