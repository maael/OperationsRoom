import Project from '../collections/project'
import User from '../collections/user'
import Invitation from '../collections/invitation'
const Waterline = require('waterline')
const mongoAdaptor = require('sails-mongo')
const config = require('../config.json')

export default function initialize () {
  return new Promise((resolve, reject) => {
    const orm = new Waterline()
    const ormConfig =
      { adapters:
        { mongo: mongoAdaptor
        }
      , connections: config.database.connections
      }
    orm.loadCollection(Project)
    orm.loadCollection(User)
    orm.loadCollection(Invitation)
    orm.initialize(ormConfig, (err, models) => {
      if (err) return reject(err)
      let database =
          { models: models.collections
          , connections: models.connections
          }
      resolve(database)
    })
  })
}
