(function () {
    app.directive('usersOnlineBox', function () {
        return {
            restrict: 'E',
            scope: {
                show: "=",
                usersOnline: "=",
                inviteToChat: '&',
                draggableOption: "="
            },
            templateUrl: 'app/dashboard/directives/usersOnline/partials/usersOnlineBox.html',
            controller: controller,
            controllerAs: 'vm',
            bindToController: true
        }


    });
    var controller = function () {

        var vm = this;

        vm.chat = chat;
        vm.sortType = 'name'; // set the default sort type
        vm.sortReverse = false;  // set the default sort order
        vm.searchUsers = '';     // set the default search/filter term



        function chat(socketId) {
            vm.inviteToChat()(socketId);
        };
    };
})();


