var boost = angular.module("boost", []);
boost.controller("BoostsCtrl", ['$scope', '$http', function($scope, $http) {
  $http.get("/login/:user").success(function(response) {
    $scope.username = response;
    console.log($scope.username);
  });
  $http.get("/boosts/:boosts").success(function(response) {
    $scope.boosts = response;
  });
  $scope.predicate = 'votes';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };
}]);
