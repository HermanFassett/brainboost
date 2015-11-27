var brainboost = angular.module("brainboost", []);
brainboost.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
  $http.get("/:boosts").success(function(response) {
    $scope.boosts = response;
  })
}]);
