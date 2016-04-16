const Waterline = require('waterline')
const Project = Waterline.Collection.extend({
  identity: 'project'
, connection: 'operationsRoomMongo'
, attributes: {
    name: 'string'
  }
})
export default Project
