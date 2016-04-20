app.controller("DashboardController", function ($scope, lodash) {

    var vm = this;

    vm.isUsersOnlineBoxVisible = true;
    vm.usersOnline;
    vm.peopleIAmChatting = [];
    vm.me;


    var init = function () {
        var warning = true;
        window.onbeforeunload = function () {
            if (warning) {
                return "You will be disconnected from your partners if you navigate away from this page";
            }
        }

    }

    init();



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
        //console.log("Chat invitation sent to " + userName);
        noty({
            timeout: 5,
            type: 'information',
            text: 'Chat invitation sent to ' + userName,
            theme: 'relax',
            layout: 'topRight',
            animation: {
                open: 'animated flipInX', // Animate.css class names
                close: 'animated flipOutX', // Animate.css class names
            }
        });
    })
    socket.on("invited to a chat", function (userWhoInvited) {

        noty({
            text: userWhoInvited.name + " has invited you to a private text chat, do you want to accept?",
            theme: 'relax',
            layout: 'topRight',
            animation: {
                open: 'animated flipInX', // Animate.css class names
                close: 'animated flipOutX', // Animate.css class names
            },
            buttons: [
                {
                    addClass: 'btn btn-primary', text: 'Yes, I do', onClick: function ($noty) {

                        $noty.close();
                      
                        socket.emit("accepted chat invitation", userWhoInvited.socketId);
                        
                          
                        if (lodash.find(vm.peopleIAmChatting, { id: userWhoInvited.id }) != null) {
                            return false;
                        }

                        
                        //vm.isTextChatBoxVisible = true;
                        vm.peopleIAmChatting.push(userWhoInvited);
                        $scope.$apply();

                    }
                },
                {
                    addClass: 'btn btn-danger', text: "No, I don't", onClick: function ($noty) {
                        $noty.close();
                        socket.emit("recused chat invitation", userWhoInvited.socketId);

                    }
                }
            ]
        });

    });

    socket.on("accepted chat invitation", function (userInvited) {

        //vm.isTextChatBoxVisible = true;

        if (lodash.find(vm.peopleIAmChatting, { id: userInvited.id }) != null) {
            return false;
        }

        vm.peopleIAmChatting.push(userInvited);
        $scope.$apply();
    });

    socket.on("recused chat invitation", function (userInvited) {
        //abrir janela de conversação

        noty({
            timeout: 5,
            type: 'error',
            text: userInvited.name + " has recused your chat invitation",
            theme: 'relax',
            layout: 'topRight',
            animation: {
                open: 'animated flipInX', // Animate.css class names
                close: 'animated flipOutX', // Animate.css class names
            }
        });
    });

    vm.sendChatMessage = function (message, socketTargetId) {
        socket.emit("send chat message", { message: message, socketTargetId: socketTargetId });
    };

    socket.on("received chat message", function (data) {
        //abrir janela de conversação
        var partner = lodash.find(vm.peopleIAmChatting, { id: data.partner.id });
        partner.receiveMessage(data.message);
        $scope.$apply();
    });

    vm.leaveChatRoom = function (partner) {
        lodash.remove(vm.peopleIAmChatting, { id: partner.id });
        socket.emit("left chat room", partner.socketId);
    }

    socket.on("left chat room", function (data) {
        var partner = lodash.find(vm.peopleIAmChatting, { id: data.id });
        partner.leftRoom();
        $scope.$apply();
    });
})
