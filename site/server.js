import createLogger from '../lib/logger'
import indexController from './components/index/controller'
const express = require('express')
export const router = express.Router()

router.use(createLogger('site'))

indexController(router)
