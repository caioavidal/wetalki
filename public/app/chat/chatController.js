app.controller('ChatController', ['$scope', '$location', '$routeParams', 'LanguageService', function($scope, $location, $routeParams, LanguageService) {
    var self = this;
    this.socket;
    this.vm = new ChatViewModel();
    this.lang = $routeParams.lang;
    



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
        
        if(this.vm.isWaitingForPartner === true){
            return;
        }
        
        if (message.trim() == "") {
            $("#inputMessage").focus();
            return;
        }
        
        self.socket.emit("message", message);
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
        self.socket.on('gochat', function(partnerSocketId) {

            //$("#waiting").hide();
            self.vm.isWaitingForPartner = false;
            //$("#messages").html("");
            self.vm.messages.length = 0;

            //$("#sendButton").removeAttr("disabled");
            self.vm.isConnectedWithPartner = true;
            var newPartnerAlert = new Audio("/audios/newpartner.mp3");
            newPartnerAlert.play();

            $scope.$apply();
        });
        
        

        self.socket.on('message', function(data) {
            var msg;
            var user;
            self.vm.messages.push({ fromPartner: data.fromPartner, message: data.msg, hasDisconnected: false });
            $scope.$apply();
           
            $(".scrollable-content").scrollTop(999999);
           

            
        });

        self.socket.on('disconnected', function(hasPartnerDisconnected) {
            self.showDisconnectMessage(hasPartnerDisconnected);
        });
    }

    this.registerDomEvents = function() {


        $("#exitButton").click(function() {
            self.exit();
        });

        $("#newPartnerButton").click(function() {
            self.findNewPartner();
        });
        $("#inputMessage").on("input", function() {

        });

    }

    this.onKeyDown = function($event) {
        if ($event.which === 13) { // enter
            self.sendMessage(self.vm.message);
            $event.preventDefault();
            return;
        }
    }

    this.findNewPartner = function(firstTime) {
        if (firstTime === false || firstTime == null) {
            if(self.disconnect() === false){
                return;
            }
        }

        self.socket = io.connect('/', {
            'reconnect': true,
            'reconnection delay': 500,
            'max reconnection attempts': 10
        });

        self.socket.emit('language', self.lang);

        self.vm.isWaitingForPartner = true;

        self.vm.isConnectedWithPartner = false;


        self.registerSocketEvents();
    }


    this.init = function() {
        self.findNewPartner(true);
    }
    this.init();




}]);