var brain = angular.module("brain", []);
brain.controller("BrainsCtrl", ['$scope', '$http', function($scope, $http) {
  $http.get("/brains/:brains").success(function(response) {
    $scope.boosts = response;
  })
}]);
