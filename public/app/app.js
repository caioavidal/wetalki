var app = angular.module("app", ['ngRoute','mobile-angular-ui','ngLodash','angular-google-adsense']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/index',
            controller: "IndexController",
            controllerAs: "ctrl"
        }).
        when('/chat/:username/:language/:userSex/:partnerSex', {
            templateUrl: 'partials/chat',
            controller: "ChatController",
            controllerAs: "ctrl"
        }).
        when('/chatroom/:room', {
            templateUrl: 'partials/chatRoom',
            controller: "ChatRoomController",
            controllerAs: "ctrl"
        }).

        otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode({
        enabled: true
        
    });
}]);