var boost = angular.module("boost", []);
boost.controller("BoostsCtrl", ['$scope', '$http', function($scope, $http) {
  $scope.reload = function() {
    $http.get("/boosts/:boosts").success(function(response) {
      console.log("/:boosts");
      $scope.boosts = response;
    });
  }
  $scope.reload();
}]);
