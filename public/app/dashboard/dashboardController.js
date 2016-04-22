angular
    .module('wetalki')
    .controller("DashboardController", DashboardController);

DashboardController.$inject = ['$scope', 'lodash', 'socket', 'Noty'];

function DashboardController($scope, lodash, socket, Noty) {

    var vm = this;

    vm.sendChatMessage = sendChatMessage;
    vm.leaveChatRoom = leaveChatRoom;
    ///
    vm.isUsersOnlineBoxVisible = true;
    vm.usersOnline;
    vm.peopleIAmChatting = [];
    vm.me;
    vm.draggableOption = {
        containment: '.content-wrapper',
        cursor: 'move'
    };



    init();

    function init() {
        var warning = true;
        window.onbeforeunload = function () {
            if (warning) {
                return "You will be disconnected from your partners if you navigate away from this page";
            }
        }
    }

    socket.on("my info", function (me) {
        vm.me = me;
    });


    socket.on("users online", function (usersOnline) {
        vm.usersOnline = usersOnline;
    });
    socket.on("user connected", function (userConnected) {
        vm.usersOnline.push(userConnected);
    });
    socket.on("user disconnected", function (userDisconnected) {
        lodash.remove(vm.usersOnline, function (n) {
            return n.socketId == userDisconnected.socketId;
        });
    });

    vm.inviteToChat = function (socketId) {
        socket.emit("invite to a chat", socketId);
    }

    // ******** Socket events *************//

    socket.on("chat invitation sent", function (userName) {
        Noty.info('Chat invitation sent to ' + userName);

    })
    socket.on("invited to a chat", function (userWhoInvited) {
        Noty.confirm(userWhoInvited.name + " has invited you to a private text chat, do you want to accept?",
            function () {
                socket.emit("accepted chat invitation", userWhoInvited.socketId);

                if (lodash.find(vm.peopleIAmChatting, { id: userWhoInvited.id }) != null) {
                    return false;
                }
                vm.peopleIAmChatting.push(userWhoInvited);
            },
            function () {
                socket.emit("recused chat invitation", userWhoInvited.socketId);
            }
        );
    });

    socket.on("accepted chat invitation", function (userInvited) {

        if (lodash.find(vm.peopleIAmChatting, { id: userInvited.id }) != null) {
            return false;
        }

        vm.peopleIAmChatting.push(userInvited);
    });

    socket.on("recused chat invitation", function (userInvited) {
        Noty.error(userInvited.name + " has recused your chat invitation");
    });

    socket.on("received chat message", function (data) {
        var partner = lodash.find(vm.peopleIAmChatting, { id: data.partner.id });
        partner.receiveMessage(data.message);
    });

    socket.on("left chat room", function (data) {
        var partner = lodash.find(vm.peopleIAmChatting, { id: data.id });
        partner.leftRoom();
    });

    /******* End Socket Events */

    function sendChatMessage(message, socketTargetId) {
        socket.emit("send chat message", { message: message, socketTargetId: socketTargetId });
    };

    function leaveChatRoom(partner) {
        lodash.remove(vm.peopleIAmChatting, { id: partner.id });
        socket.emit("left chat room", partner.socketId);
    }
};
