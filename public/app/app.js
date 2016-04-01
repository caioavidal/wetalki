var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/index',
            controller: "IndexController",
            controllerAs: "ctrl"
        }).
        when('/chat', {
            templateUrl: 'partials/chat',
            controller: "ChatController",
            controllerAs: "ctrl"
        }).

        otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);