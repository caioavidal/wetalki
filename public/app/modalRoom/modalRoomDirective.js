app.directive('modalRoom', function() {
    return {
        templateUrl: '/app/modalRoom/modalRoom.html',
        restrict: 'E',
        scope: {
            roomName: "=name",
            roomDescription: "=description"
        },
        controller: ['$location','$scope', function ( $location,$scope) {
                $scope.goToRoom = function(language,roomName){
                    window.open('/chatroom/' + language + '-' + roomName.toLowerCase() + '-' + 'room','_blank');
                }
            }]
        };
   
});