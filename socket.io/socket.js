

var socket = function (http) {

    var _ = require("lodash");
    var io = require('socket.io')(http);

    var socketioJwt = require('socketio-jwt');

    var connectedClients = io.sockets.sockets;

    io.use(socketioJwt.authorize({
        secret: process.env.SECRET,
        handshake: true
    }));


    var sendUsersOnline = function (socket) {
        var socketIds = _.keys(connectedClients);

        var usersOnline = [];

        socketIds.forEach(function (socketId) {
            usersOnline.push({
                socketId: socketId,

                name: connectedClients[socketId].decoded_token.name

            });
        })

        socket.emit('users online', usersOnline);
    };

    io.on('connection', function (socket) {

        socket.broadcast.emit('user connected', {
            socketId: socket.id,

            name: socket.decoded_token.name

        });
        
        socket.emit('my info', {
            socketId: socket.id,
            name: socket.decoded_token.name
        });

        sendUsersOnline(socket);

        socket.on('disconnect', function () {
            io.sockets.emit('user disconnected', {
                socketId: socket.id//,

                //name: socket.decoded_token.name

            });
        });

        require('../socket.io/chat.js')(socket, connectedClients);

    });

}

module.exports = socket;