var app = angular.module("app", ['ngRoute','mobile-angular-ui']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/index',
            controller: "IndexController",
            controllerAs: "ctrl"
        }).
        when('/chat/:lang', {
            templateUrl: 'partials/chat',
            controller: "ChatController",
            controllerAs: "ctrl"
        }).

        otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode({
        enabled: true
        
    });
}]);