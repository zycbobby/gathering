// Declare app level module which depends on filters, and services
angular.module('gathering', ['ngResource', 'ngRoute', 'ui.bootstrap', 'ui.date'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeController'
            })
            .when('/people', {
                templateUrl: 'views/people/people.html',
                controller: 'PeopleController'
            })
            .otherwise({redirectTo: '/'});
    }]);
