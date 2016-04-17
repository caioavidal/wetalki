(function () {
    app.directive('usersOnlineBox', function () {
        return {
            restrict: 'E',
            scope: {
                show: "=",
                usersOnline: "=",
                inviteToChat: '&'
            },
            templateUrl: 'app/dashboard/directives/usersOnline/partials/usersOnlineBox.html',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        }


    });
    var controller = function () {

        var vm = this;

        vm.chat = function (socketId) {
            vm.inviteToChat()(socketId);
        };
    };
})();


