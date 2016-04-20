

var socket = function (http) {

    var _ = require("lodash");
    var io = require('socket.io')(http);

    var socketUser = require("../socket.io/socketUser.js");

    var socketioJwt = require('socketio-jwt');

    var connectedClients = io.sockets.sockets;

    io.use(socketioJwt.authorize({
        secret: process.env.SECRET,
        handshake: true
    }));


    var sendUsersOnline = function (socket) {
        var usersOnline = socketUser.getOnlineUsers(connectedClients);
        socket.emit('users online', usersOnline);
    };

    var disconnectDuplicatedUser = function (socket) {
        var user = socketUser.buildUser(socket);
        var onlineUsers = socketUser.getOnlineUsers(connectedClients);


        var userAlreadyConnected = _.find(onlineUsers, { id: user.id });

        if (userAlreadyConnected != null && userAlreadyConnected.socketId != socket.id) {
            connectedClients[userAlreadyConnected.socketId].disconnect();
        }
    }



    io.on('connection', function (socket) {
        console.log("Socket connected: " + socket.id);

        socket.peopleIamChatting = [];

        disconnectDuplicatedUser(socket);

        socket.broadcast.emit('user connected', socketUser.buildUser(socket));

        socket.emit('my info', socketUser.buildUser(socket));

        sendUsersOnline(socket);

        socket.on('disconnect', function () {
            console.log("Socket disconnected: " + socket.id);
            io.sockets.emit('user disconnected', socketUser.buildUser(socket));

            socket.peopleIamChatting.forEach(function (partner) {
                var socketTargetId = partner.partnerId;
                if (socketTargetId != null && connectedClients[socketTargetId] != null) {
                    _.remove(connectedClients[socketTargetId].peopleIamChatting, { partnerId: socket.id });
                }

                socket.to(socketTargetId).emit('left chat room', socketUser.buildUser(socket));
            });



        });

        require('../socket.io/chat.js')(socket, connectedClients);

    });

}

module.exports = socket;