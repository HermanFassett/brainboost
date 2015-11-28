var brain = angular.module("brain", []);
brain.controller("BrainsCtrl", ['$scope', '$http', function($scope, $http) {
  $http.get("/brains/:brains").success(function(response) {
    $scope.boosts = response;
  });
  $scope.predicate = 'votes';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };
}]);
