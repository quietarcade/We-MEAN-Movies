var myApp = angular.module('myApp', ['ui.bootstrap']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World controller");

    $scope.currentPage = 1;
    $scope.pageSize = 5;


var refresh = function() {
  $http.get('/movies').success(function(response) {
    console.log("Data Requested");
    $scope.movies = response;
    $scope.movies_list = "";
  });
};

refresh();

$scope.addStop = function() {
  console.log($scope.movies_list);
  $http.post('/movies', $scope.movies_list).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/movies/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/movies/' + id).success(function(response) {
    $scope.movies_list = response;
  });
};  

$scope.update = function() { //function needs fixed
  console.log($scope.movies_list._id);  //Function fixed. replaced ($scope.stop._id) with ($scope.movies_list._id);  
  $http.put('/movies/' + $scope.movies_list._id, $scope.movies_list).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.movies_list = "";
}


}])﻿

.filter('pagination', function()   {
     return function(movies, start) {
       return movies.slice(start);
    }

  });