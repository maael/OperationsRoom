const Waterline = require('waterline')
const Invitation = Waterline.Collection.extend({
  identity: 'invitation'
, connection: 'operationsRoomMongo'
, attributes:
  { service: 'string'
  , username: 'string'
  , serviceUserId: 'string'
  }
})
export default Invitation
