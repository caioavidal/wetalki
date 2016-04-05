function ChatViewModel() {

    this.messages = [];
    this.isConnectedInRoom = false;
    this.isWaitingForUsername = true;
    this.message = '';
    this.roomOnlineUsers = [];
    this.roomError = '';
}
