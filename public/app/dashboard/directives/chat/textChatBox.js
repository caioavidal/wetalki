
app.directive('textChatBox', function () {
    return {
        restrict: 'E',
        scope: {
            partner: "=",
            sendMessage: "&",
            leaveChatRoom: "&",
            me: '='
        },
        templateUrl: 'app/dashboard/directives/chat/partials/directChatBox.html',
        controller: controller,
        controllerAs: 'vm',
        bindToController: true
    }


});
var controller = function () {

    var vm = this;

    vm.contacts = [];
    vm.messages = [];
    vm.hasPartnerLeftRoom = false;



    function init() {
        vm.contacts.push(vm.partner);
        vm.contacts.push(vm.me);

    }

    vm.sendMsg = function (message, socketTargerId) {
        if (message == null || message.trim() == '') {
            return false;
        }

        vm.message = '';
        vm.sendMessage()(message, socketTargerId);

        vm.messages.push({
            messageText: message,
            fromPartner: false,
            time: moment().format('DD MMM h:mm a')
        });
    }

    vm.partner.receiveMessage = function (message) {

        vm.hasPartnerLeftRoom = false;

        vm.messages.push({
            messageText: message,
            fromPartner: true,
            time: moment().format('DD MMM h:mm a')
        });

        $(".box-body").scrollTop(999999);
    }

    vm.onKeyDown = function ($event) {
        if ($event.which === 13) { // enter
            vm.sendMsg(vm.message, vm.partner.socketId);
            $event.preventDefault();
            return;
        }
    }
    

    vm.leaveRoom = function (partner) {

        vm.leaveChatRoom()(partner);
    }

    vm.partner.leftRoom = function () {
        vm.hasPartnerLeftRoom = true;
    }



    init();

};


