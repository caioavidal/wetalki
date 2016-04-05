app.controller('ChatRoomController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    var self = this;
    this.socket;
    this.vm = new ChatViewModel();
    this.lang = $routeParams.lang;
    this.room = $routeParams.room;

    this.exit = function exit() {

        if (self.disconnect() === true) {
            $location.path('/');
        }
    }

    $scope.$on("$destroy", function(event) {
        
        self.socket.emit("forceDisconnectRoom");
    });

    this.disconnect = function() {
        var confirm = window.confirm("Are you sure?");
        if (confirm === true) {
            self.socket.emit("forceDisconnectRoom");
            return true;
        }
        return false;

    }

    this.sendMessage = function sendMessage(message) {

        if (this.vm.isWaitingForUsername === true) {
            return;
        }

        if (message.trim() == "") {
            $("#inputMessage").focus();
            return;
        }

        self.socket.emit("roomMessage", message);
        self.vm.message = "";
        $("#inputMessage").focus();



    }

    this.showDisconnectMessage = function(username) {
        var msg = "";
        if (username === self.vm.username) {

            msg += "You have disconnected from this room";
        } else {
            msg += username + " has disconnected from the room";
        }
        self.vm.messages.push({ 
            from: '', 
            message: msg, 
            hasDisconnected: true });
            
        $scope.$apply();

    }

    this.registerSocketEvents = function() {



        self.socket.on('joinned', function(data) {

            var username = data.username;
            var roomOnlineUsers = data.roomOnlineUsers;

            self.vm.isWaitingForUsername = false;

            self.vm.isConnectedInRoom = true;
            if (username === self.vm.username) {
                // self.vm.messages.push({ from: "", message: username + " has connected to the room", youConnected: true });
                var newPartnerAlert = new Audio("/audios/newpartner.mp3");
                newPartnerAlert.play();
            } else {

            }
            self.vm.messages.push({ from: "", message: username + " has connected to the room", youConnected: true });
            self.vm.roomOnlineUsers = roomOnlineUsers;

            $scope.$apply();

            $(".scrollable-content#messageBox").scrollTop(999999);
        });



        self.socket.on('roomMessage', function(data) {
            self.vm.messages.push({ from: data.username, message: data.msg, hasDisconnected: false });
            $scope.$apply();

            $(".scrollable-content#messageBox").scrollTop(999999);
        });

        self.socket.on('disconnected', function(username) {
            self.showDisconnectMessage(username);
            self.removeUserFromList(username);
            $scope.$apply();
        });
        self.socket.on('roomError', function(roomError) {
            self.vm.roomError = roomError;
            $scope.$apply();
        });
    }
    
    this.removeUserFromList = function(username){
        _.remove(self.vm.roomOnlineUsers,function(user){
            return user === username;
        } );
    }



    this.onKeyDown = function($event) {
        if ($event.which === 13) { // enter
            self.sendMessage(self.vm.message);
            $event.preventDefault();
            return;
        }
    }



    this.joinRoom = function(username) {

        if (self.socket == null || self.connect === false) {
            self.socket = io.connect('/', {
                'reconnect': true,
                'reconnection delay': 500,
                'max reconnection attempts': 10
            });

            self.registerSocketEvents();
        }



        self.socket.emit('joinRoom', {
            username: username,
            room: self.room
        });

        self.vm.isWaitingForUsername = true;

        self.vm.isConnectedInRoom = false;



    }






}]);