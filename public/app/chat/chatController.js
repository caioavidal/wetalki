app.controller('ChatController', ['$scope', '$location','LanguageService',function($scope,$location, LanguageService) {
    var self = this;
    var socket = io('/');
    

    
this.exit = function exit() {
    var confirm = window.confirm("Are you sure?");
    if (confirm === true) {
        socket.emit("forceDisconnect");
    }
}

this.sendMessage = function sendMessage() {
    
    var msg = $("#inputMessage").val();
    
    if(msg.trim() == ""){
        $("#inputMessage").focus();
        return;
    }
    
    socket.emit("message", msg);
    $("#inputMessage").val("");
    $("#inputMessage").focus();
    
    
}

this.disconnect = function disconnect(hasPartnerDisconnected) {
    var msg;
    if (hasPartnerDisconnected === true) {

        msg = "Your partner has disconnected";
    } else {
        msg = "You have disconnected";
    }

    $("#waiting").hide();
    $("#messagesBox").show();

    $("#messages").append('<p class="disconnected">' + msg + '</p>');
    $("#sendButton").attr("disabled", "disabled");

    $("#exitButton").hide();
    $("#newPartnerButton").show();
    $("#chooseAnotherLanguage").show();



}

function registerSocketEvents() {
    socket.on('gochat', function(partnerSocketId) {

        $("#waiting").hide();
        $("#messages").html("");
        $("#messagesBox").show();
        $("#sendButton").removeAttr("disabled");
        var newPartnerAlert = new Audio("/audios/newpartner.mp3");
        newPartnerAlert.play();
    });

    socket.on('message', function(data) {
        var msg;
        var user; 
        
        if (data.fromPartner === true) {

            user = $('<span class="partner">Partner:</span>');
        }
        else {
            user = $('<span class="you">You:</span>');
        }

        //msg += data.msg;
        var message = $('<span>');
        message.text(" " + data.msg.trim());
        
        var p = $("<p>");
        p.append(user);
        p.append(message);

        $("#messages").append(p);
        
        $("#chatMessages")[0].scrollTop = $("#chatMessages")[0].scrollHeight;
    });

    socket.on('disconnected', function(hasPartnerDisconnected) {
        disconnect(hasPartnerDisconnected);
    });
}

function registerDomEvents() {
    $("#sendButton").click(function() {
        sendMessage();
    });

    $("#exitButton").click(function() {
        exit();
    });

    $("#newPartnerButton").click(function() {
        findNewPartner();
    });
    $("#inputMessage").on("input",function(){
      
    });

    $("#inputMessage").on("keydown",function(event){
       if (event.which === 13) {
           sendMessage();
           event.preventDefault();
           return;
       }
    });
}

function findNewPartner() {
    socket = io.connect('/', {
        'reconnect': true,
        'reconnection delay': 500,
        'max reconnection attempts': 10
    });
    socket.emit('language', $("#lang").val());

    $("#newPartnerButton").hide();
    $("#exitButton").show();
    $("#waiting").show();
    $("#messages").html("");
    $("#messagesBox").hide();
    $("#sendButton").attr("disabled", "disabled");
    $("#chooseAnotherLanguage").hide();

    registerSocketEvents();
}


  


}]);