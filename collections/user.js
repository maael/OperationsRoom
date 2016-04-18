const Waterline = require('waterline')
const User = Waterline.Collection.extend({
  identity: 'user'
, connection: 'operationsRoomMongo'
, attributes:
  { githubId: 'string'
  , token: 'string'
  , email: 'string'
  , name: 'string'
  }
})
export default User
