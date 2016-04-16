import createLogger from '../lib/logger'
import initializeDatabase from '../lib/database'
import projectController from './components/project/controller'
import githubController from './components/github/controller'
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
export const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(methodOverride())
router.use(createLogger('api', '/api'))

initializeDatabase(router, (err, router) => {
  if (err) throw err
  projectController(router)
  githubController(router)
})
