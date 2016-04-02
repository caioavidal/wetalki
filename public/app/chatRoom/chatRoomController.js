app.controller('ChatRoomController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    var self = this;
    this.socket;
    this.vm = new ChatViewModel();
    this.lang = $routeParams.lang;
    this.room = $routeParams.room;

 this.vm.chatUsers = [
    { name: 'Carlos  Flowers', online: true },
    { name: 'Byron Taylor', online: true },
    { name: 'Jana  Terry', online: true },
    { name: 'Darryl  Stone', online: true },
    { name: 'Fannie  Carlson', online: true },
    { name: 'Holly Nguyen', online: true },
    { name: 'Bill  Chavez', online: true },
    { name: 'Veronica  Maxwell', online: true },
    { name: 'Jessica Webster', online: true },
    { name: 'Jackie  Barton', online: true },
    { name: 'Crystal Drake', online: false },
    { name: 'Milton  Dean', online: false },
    { name: 'Joann Johnston', online: false },
    { name: 'Cora  Vaughn', online: false },
    { name: 'Nina  Briggs', online: false },
    { name: 'Casey Turner', online: false },
    { name: 'Jimmie  Wilson', online: false },
    { name: 'Nathaniel Steele', online: false },
    { name: 'Aubrey  Cole', online: false },
    { name: 'Donnie  Summers', online: false },
    { name: 'Kate  Myers', online: false },
    { name: 'Priscilla Hawkins', online: false },
    { name: 'Joe Barker', online: false },
    { name: 'Lee Norman', online: false },
    { name: 'Ebony Rice', online: false }
  ];



    this.exit = function exit() {

        if (self.disconnect() === true) {
            $location.path('/');
        }
    }

    this.disconnect = function() {
        var confirm = window.confirm("Are you sure?");
        if (confirm === true) {
            self.socket.emit("forceDisconnect");
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

    this.showDisconnectMessage = function(hasPartnerDisconnected) {
        var msg = "";
        if (hasPartnerDisconnected === true) {

            msg += "Your partner has disconnected";
        } else {
            msg += "You have disconnected";
        }

        //$("#waiting").hide();
        //self.vm.isWaitingForPartner = false;


        self.vm.messages.push({
            fromPartner: hasPartnerDisconnected,
            message: msg,
            hasDisconnected: true
        });

        $scope.$apply();

    }

    this.registerSocketEvents = function() {
     
     
        
        self.socket.on('joinned', function(data) {
            
            var username = data.username;
            var roomOnlineUsers = data.roomOnlineUsers;
            
            self.vm.isWaitingForUsername = false;

            self.vm.isConnectedInRoom = true;
            if(username === self.vm.username){
               // self.vm.messages.push({ from: "", message: username + " has connected to the room", youConnected: true });
                var newPartnerAlert = new Audio("/audios/newpartner.mp3");
                newPartnerAlert.play();    
            }else{
               
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

        self.socket.on('disconnected', function(hasPartnerDisconnected) {
            self.showDisconnectMessage(hasPartnerDisconnected);
        });
    }

   

    this.onKeyDown = function($event) {
        if ($event.which === 13) { // enter
            self.sendMessage(self.vm.message);
            $event.preventDefault();
            return;
        }
    }
    
    

    this.joinRoom = function(username) {

        if(self.socket == null || self.connect === false){
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