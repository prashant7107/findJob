// public/core.js

var jobsFind = angular.module('jobsFind', []);

function mainController($scope, $http) {
    $scope.formData = {};
               query: 'Sanima',
               $http.get('/api/search/',{params:{industry:'Education',skills:'sanima'}})
        .success(function(data) {
            $scope.datas = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

  
}
