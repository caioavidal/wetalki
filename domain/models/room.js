function Room(hash) {
    this.hash = hash;
    this.participants = [];

}


Room.prototype.addParticipant = function(participant) {
    this.participants.push(participant);
}

Room.prototype.isWaitingForParticipant = function() {
    return this.participants.length < 2;
}

Room.prototype.isFull = function() {
    return this.participants.length >= 2;
}

module.exports = Room;