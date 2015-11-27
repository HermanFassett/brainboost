var boost = angular.module("boost", []);
boost.controller("BoostsCtrl", ['$scope', '$http', function($scope, $http) {
  $scope.reload = function() {
    $http.get("/:boosts").success(function(response) {
      $scope.boosts = response;
    });
  }
  $scope.reload();
}]);
