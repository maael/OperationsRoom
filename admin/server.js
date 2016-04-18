import createLogger from '../lib/middleware/logger'
import accountController from './components/account/controller'
import projectController from './components/project/controller'
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const config = require('../config.json')
const router = express.Router()

export default function createRouter (database) {
  router.database = database
  router.use(createLogger('admin', '/admin'))
  router.use(cookieParser())
  router.use(bodyParser.urlencoded({ extended: true }))
  router.use(bodyParser.json())
  router.use(session(
    { secret: config.secret
    , saveUninitialized: false
    , resave: false
    }))
  router.use(passport.initialize())
  router.use(passport.session())
  router.use('/public', express.static(__dirname + '/public/build'))

  accountController(router)
  projectController(router)
  return router
}
