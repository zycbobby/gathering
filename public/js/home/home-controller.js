angular.module('gathering')
  .controller('HomeController', function ($scope, $http) {

        $scope.info = {
            name : '',
            telephone: '',
            breakfast: false,
            meeting: false,
            dinner: false
        };

        $scope.submit = function(){
            $http.post('/submit', $scope.info).then(function(){
                alert('报名成功');
                $scope.info = {
                    name : '',
                    telephone: '',
                    breakfast: false,
                    meeting: false,
                    dinner: false
                };
            }, function(){
                $scope.result = '系统错误';
            })

        }
  });
