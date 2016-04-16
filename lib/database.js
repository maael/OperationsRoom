import Project from '../collections/project'
const Waterline = require('waterline')
const mongoAdaptor = require('sails-mongo')
const config = require('../config.json')

export default function initialize (router, cb) {
  const orm = new Waterline()
  const ormConfig =
    { adapters:
      { mongo: mongoAdaptor
      }
    , connections: config.database.connections
    }
  orm.loadCollection(Project)
  orm.initialize(ormConfig, (err, models) => {
    if (err) return cb(err)
    router.models = models.collections
    router.connections = models.connections
    cb(err, router)
  })
}
