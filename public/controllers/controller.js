var brainboost = angular.module("brainboost", []);
brainboost.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
  $http.get("/:all").success(function(response) {
    $scope.boosts = response;
  })
}]);
