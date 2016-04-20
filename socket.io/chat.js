

var chat = function (socket, connectedClients) {

    var _ = require("lodash");
    var socketUser = require("../socket.io/socketUser.js");



    socket.on("invite to a chat", function (socketTargetId) {

        if (_.find(socket.peopleIamChatting, { partnerId: socketTargetId }) != null) {
            return false;
        }
        if(socketTargetId == socket.id){
            return false;
        }

        socket.peopleIamChatting.push({
            partnerId: socketTargetId
        });

        socket.to(socketTargetId).emit('invited to a chat', socketUser.buildUser(socket));
        socket.emit("chat invitation sent", connectedClients[socketTargetId].decoded_token.name);

    });

    socket.on("accepted chat invitation", function (socketTargetId) {
        socket.to(socketTargetId).emit('accepted chat invitation', socketUser.buildUser(socket));


        socket.peopleIamChatting.push({
            partnerId: socketTargetId
        });
    });

    socket.on("recused chat invitation", function (socketTargetId) {
        if (connectedClients[socketTargetId].peopleIamChatting != null) {
            _.remove(connectedClients[socketTargetId].peopleIamChatting, {
                partnerId: socket.id
            });
        }

        socket.to(socketTargetId).emit('recused chat invitation', socketUser.buildUser(socket));
    });

    socket.on("send chat message", function (data) {
        if (_.find(socket.peopleIamChatting, { partnerId: data.socketTargetId }) == null) {
            return false;
        }

        if (_.isEmpty(data.message)) {
            return false;
        }

        socket.to(data.socketTargetId).emit('received chat message', {
            message: data.message,
            partner: socketUser.buildUser(socket)
            
        });
    });

    socket.on("left chat room", function (socketTargetId) {
        
        if (socketTargetId != null && connectedClients[socketTargetId] != null ) {
            _.remove(connectedClients[socketTargetId].peopleIamChatting, { partnerId: socket.id });
            _.remove(socket.peopleIamChatting, { partnerId: socketTargetId });
        }

        socket.to(socketTargetId).emit('left chat room', socketUser.buildUser(socket));
    });



}

module.exports = chat;

