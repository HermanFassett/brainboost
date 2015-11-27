var boost = angular.module("boost", []);
boost.controller("BoostsCtrl", ['$scope', '$http', function($scope, $http) {
  $http.get("/boosts/:boosts").success(function(response) {
    $scope.boosts = response;
  });
}]);
