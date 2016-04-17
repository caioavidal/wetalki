app.controller("DashboardController", function ($scope, lodash) {

    var vm = this;

    vm.isUsersOnlineBoxVisible = true;
    vm.usersOnline;
    vm.peopleIAmChatting = [];
    vm.me;



    var socket = io.connect('/', {
        query: 'token=' + window.sessionStorage.token
    });

    socket.on("my info", function (me) {
        vm.me = me;
    });


    socket.on("users online", function (usersOnline) {
        vm.usersOnline = usersOnline;
        $scope.$apply();
    });
    socket.on("user connected", function (userConnected) {
        vm.usersOnline.push(userConnected);
        $scope.$apply();
    });
    socket.on("user disconnected", function (userDisconnected) {
        lodash.remove(vm.usersOnline, function (n) {
            return n.socketId == userDisconnected.socketId;
        });
        $scope.$apply();
    });

    vm.inviteToChat = function (socketId) {
        socket.emit("invite to a chat", socketId);
    }

    socket.on("chat invitation sent", function (userName) {
        console.log("Chat invitation sent to " + userName);
    })
    socket.on("invited to a chat", function (userWhoInvited) {
        var anwser = confirm(userWhoInvited.name + " has invited you to a private text chat, do you want to accept?");
        if (anwser === true) {
            socket.emit("accepted chat invitation", userWhoInvited.socketId);

            vm.isTextChatBoxVisible = true;
            vm.peopleIAmChatting.push(userWhoInvited);
        } else {
            socket.emit("recused chat invitation", userWhoInvited.socketId);
        }
        $scope.$apply();
    });

    socket.on("accepted chat invitation", function (userInvited) {
        //abrir janela de conversação
        //alert(userInvited.name + " has accepted your chat invitation");
        vm.isTextChatBoxVisible = true;
        vm.peopleIAmChatting.push(userInvited);
        $scope.$apply();
    });

    socket.on("recused chat invitation", function (userInvited) {
        //abrir janela de conversação
        alert(userInvited.name + " has recused your chat invitation");
    });

    vm.sendChatMessage = function (message, socketTargetId) {
        socket.emit("send chat message", { message: message, socketTargetId: socketTargetId });
    };

    socket.on("received chat message", function (data) {
        //abrir janela de conversação
        var partner = lodash.find(vm.peopleIAmChatting, { socketId: data.socketSenderId });
        partner.receiveMessage(data.message);
        $scope.$apply();
    });
})