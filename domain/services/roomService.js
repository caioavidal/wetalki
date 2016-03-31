function RoomService() {

}

RoomService.prototype.hasIncompleteRoom = function(rooms) {
    for (var i = 0; i < rooms.length; i++) {
        if (!rooms[i].isFull()) {
            return true;
        }
    }
}

RoomService.prototype.getIncompleteRoom = function(rooms) {
    for (var i = 0; i < rooms.length; i++) {
        if (!rooms[i].isFull()) {
            return rooms[i];
        }
    }

    return null;
}
module.exports = RoomService;