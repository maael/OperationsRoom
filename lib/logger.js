const bunyan = require('bunyan')
const config = require('../config.json')

export default function createLogger (routerName, root = '') {
  return (req, res, next) => {
    const logger = bunyan.createLogger({ name: config.projectName })
    function reqSerializer (req) {
      return ({ method: req.method, url: `${root}${req.url}` })
    }
    logger.addSerializers({ req: reqSerializer })
    logger.info({ server: routerName, req: req })
    next()
  }
}
