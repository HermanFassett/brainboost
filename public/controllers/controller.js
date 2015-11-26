var brainboost = angular.module("brainboost", []);
brainboost.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
  $http.get("/").success(function(response) {
    $scope.boosts = response;
  })
}]);
