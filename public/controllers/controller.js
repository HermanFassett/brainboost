var brainboost = angular.module("brainboost", []);
brainboost.controller("AppCtrl", ['$scope', '$http', function($scope, $http) {

}]);
brainboost.controller("SignupCtrl", ['$scope', '$http', function($scope, $http) {
  $scope.signup = function() {
    $scope.inputuser = { username: $scope.user.username, email: $scope.user.email, password: $scope.user.password, joinDate: new Date()}
    $http.post("/users/:users", $scope.inputuser).success(function(response) {
      if (response === "fail") {
        $scope.user.password = $scope.user.username = $scope.user.email = "";
        $scope.error = "Username or email already in use"
        $scope.success = "";
      }
      else if (response === "success"){
        $scope.error = "";
        $scope.success = "Username created"
      }
    });
  }
}]);
brainboost.controller("LoginCtrl", ['$scope', '$http', function($scope, $http) {
  $scope.login = function() {
    $scope.inputuser = { type: "login", email: $scope.user.email, password: $scope.user.password}
    $http.post("/users/:users", $scope.inputuser).success(function(response) {
      if (response === "fail") {
        $scope.user.password = $scope.user.email = "";
        $scope.error = "Login failed"
        $scope.success = "";
      }
      else {
        $scope.error = "";
        $scope.success = "Login as " + response[0].username + " successful";
        console.log(response);
      }
    });
  }
}]);
