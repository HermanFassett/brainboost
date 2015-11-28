var users = angular.module("users", []);
users.controller("UserCtrl", ['$scope', '$http', function($scope, $http) {
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
