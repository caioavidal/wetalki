app.controller('IndexController', ['$scope', '$location', 'LanguageService', 'RoomService', function($scope, $location, LanguageService, RoomService) {
    var self = this;
    var socket = io('/');
    self.vm = new IndexViewModel();



    this.init = function() {
        this.registerNumUsersOnline();

        LanguageService.getAllLanguages().then(function(languages) {
            self.vm.languages = languages;
        });
    }


    this.registerNumUsersOnline = function() {
        socket.on("numUsersOnline", function(numUsersOnline) {
            self.vm.numUsersOnline = numUsersOnline;
            $scope.$apply();
        });
    }

    this.goToOneToOneChatRoom = function(selectedLanguage) {
        //window.location.href = "/"
        $location.path("chat/" + selectedLanguage.value);
    }

    this.loadRooms = function(langCode, topic) {
        RoomService.getAllRoomsByLanguageAndTopic(langCode, topic)
            .then(function(rooms) {
                self.vm.availableRooms = rooms;
            });
    }

    this.joinRoom = function(room) {
        $location.path("chatroom/" + room);
    }



    this.init();



}]);