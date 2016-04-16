import createLogger from '../lib/logger'
const express = require('express')
export const router = express.Router()

router.use(createLogger('admin', '/admin'))

router.get('/', (req, res) => {
  res.send('admin home page')
})

router.get('/welcome', (req, res) => {
  res.send('admin welcome')
})
