var users = angular.module("users", []);
users.controller("UsersCtrl", ['$scope', '$http', function($scope, $http) {
  $http.get("/login/:user").success(function(response) {
    $scope.username = response;
  });
  $http.get("/users/:users").success(function(response) {
    $scope.users = response;
  });
  $scope.predicate = 'username';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };
}]);
users.controller("UserCtrl", ["$scope", "$http", function($scope, $http) {
  $http.get("/login/:user").success(function(response) {
    $scope.username = response;
  });
  $http.get("/:all").success(function(response) {
    $scope.posts = response;
  });
}]);
