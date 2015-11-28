var brainboost = angular.module("brainboost", []);
brainboost.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {
  alert($(document).width() + "," + $(document).height());
}]);
