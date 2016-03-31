// $(function(){

//     var socket = io('/');

//     socket.on("numUsersOnline",function(numUsersOnline){
//             // $("#numUsersOnline").html("<strong>"+  numUsersOnline + "</strong>" + " online now");
//             this.AppViewModel.numUsersOnline = numUsersOnline;
//     });


// })

function AppViewModel() {

    var self = this;

    self.numUsersOnline = ko.observable();
    self.rooms =  ko.observable();

    var socket = io('/');

    socket.on("numUsersOnline", function(numUsersOnline) {
        self.numUsersOnline(numUsersOnline);
    });
    
    socket.on("listRooms", function(rooms) {
        self.rooms(rooms);
    });

    self.listRooms = function() {
        socket.emit("listRooms", { lang: 'en', topic: 'politics' });
    };
    
    self.joinRoom = function(room){
        socket.emit("joinRoom", room.name);
    }
}

ko.applyBindings(new AppViewModel());



