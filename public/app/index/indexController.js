app.controller('IndexController', ['$scope', '$location', 'LanguageService', 'RoomService', 'lodash', function($scope, $location, LanguageService, RoomService, lodash) {
    var self = this;
    var socket = io('/');
    self.vm = new IndexViewModel();



    this.init = function() {
        this.registerNumUsersOnline();

        LanguageService.getAllLanguages().then(function(languages) {
            self.vm.languages = languages;
        });


    }

    this.openModal = function(roomName, roomDescription) {
        self.vm.roomName = roomName;
        self.vm.roomDescription = roomDescription;

        $("#modalRoom").modal('show');
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

    this.createRoom = function(roomNameToCreate) {
        if (roomNameToCreate == null || roomNameToCreate.trim() == '') {
            return false;
        }
        self.vm.chatRoomCreated = 'www.wetalki.com/chatroom/' + roomNameToCreate.toLowerCase().replace(/\s+/g, '-');
    }

    this.loadRooms = function(langCode, topic) {
        RoomService.getAllRoomsByLanguageAndTopic(langCode, topic)
            .then(function(rooms) {
                self.vm.availableRooms = rooms;
            });
    }

    this.findPartner = function(username, selectedLanguage, userSex, partnerSex) {
        username = username.trim()
        selectedLanguage = selectedLanguage.trim();
        userSex = userSex.trim();
        partnerSex = partnerSex.trim();

        if (lodash.isEmpty(username) ||
            lodash.isEmpty(selectedLanguage) ||
            lodash.isEmpty(userSex) ||
            lodash.isEmpty(partnerSex)) {
            return false;
        }

        window.open("/chat/" + username + '/' + selectedLanguage + '/' + userSex + '/' + partnerSex, '_blank');
    }

    this.joinRoom = function(room) {



        $("#roomsModal").modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $location.path("chatroom/" + room);

    }



    this.init();



}]);