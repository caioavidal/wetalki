

var chat = function (socket, connectedClients) {

    var _ = require("lodash");

    socket.on("invite to a chat", function (socketTargetId) {
        socket.to(socketTargetId).emit('invited to a chat',{
            socketId: socket.id,
            name: socket.decoded_token.name
        });
        socket.emit("chat invitation sent", connectedClients[socketTargetId].decoded_token.name);
    });
      socket.on("accepted chat invitation", function (socketTargetId) {
        socket.to(socketTargetId).emit('accepted chat invitation', {
            socketId: socket.id,
            name: socket.decoded_token.name
        });
        
        socket.join(socketTargetId);
    });
    
    socket.on("recused chat invitation", function (socketTargetId) {
        socket.to(socketTargetId).emit('recused chat invitation', {
            socketId: socket.id,
            name: socket.decoded_token.name
        });
    });
    
    socket.on("send chat message", function(data){
        socket.broadcast.to(data.socketTargetId).emit('received chat message', {
            message: data.message,
            socketSenderId: socket.id
        });
    });
    
    

}

module.exports = chat;

