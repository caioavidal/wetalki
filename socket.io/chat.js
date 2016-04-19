

var chat = function (socket, connectedClients) {

    var _ = require("lodash");
    var socketUser = require("../socket.io/socketUser.js");

    socket.on("invite to a chat", function (socketTargetId) {
        socket.to(socketTargetId).emit('invited to a chat', socketUser.buildUser(socket));
        socket.emit("chat invitation sent", connectedClients[socketTargetId].decoded_token.name);
    });
    socket.on("accepted chat invitation", function (socketTargetId) {
        socket.to(socketTargetId).emit('accepted chat invitation', socketUser.buildUser(socket));

        socket.join(socketTargetId);
    });

    socket.on("recused chat invitation", function (socketTargetId) {
        socket.to(socketTargetId).emit('recused chat invitation', socketUser.buildUser(socket));
    });

    socket.on("send chat message", function (data) {
        socket.broadcast.to(data.socketTargetId).emit('received chat message', socketUser.buildUser(socket));
    });



}

module.exports = chat;

