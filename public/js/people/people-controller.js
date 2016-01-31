angular.module('gathering')
  .controller('PeopleController', function ($scope, $http) {
        $scope.people = [];
        $http.get('/people').then(function(response){
            if (response.status < 400) {
                $scope.people = response.data;
            }
        })
  });
