var crypto = require('crypto');
var _ = require('lodash');

var SocketUser = function () {

}

SocketUser.buildUser = function (socket) {
    return {
        socketId: socket.id,
        name: socket.decoded_token.name,
        id: crypto.createHash('sha256').update(socket.decoded_token.email).digest('hex')
    }
}

SocketUser.getOnlineUsers = function (connectedClients) {
    var socketIds = _.keys(connectedClients);

    var onlineUsers = [];

    socketIds.forEach(function (socketId) {
        var socket = connectedClients[socketId];
        onlineUsers.push(SocketUser.buildUser(socket));
    });

    return onlineUsers;
}




module.exports = SocketUser;