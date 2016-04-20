var crypto = require('crypto');
var _ = require('lodash');

var SocketRoom = function () {

}

SocketRoom.generateNewRoomIdFor2People = function (socket) {
   return '2p_' + crypto.createHash('sha1').update(new Date().getTime()).digest('hex');
}





module.exports = SocketRoom;