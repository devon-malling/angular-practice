'use strict';

angular.module('myApp.test1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/test1', {
    templateUrl: 'test1/connector.html',
    controller: 'ConnectorCtrl'
  });
}])

.controller('ConnectorCtrl', ['$scope', '$http', function ($scope, $http) {
	$http.get('http://localhost:3000/connectors').success(function(data) {
	        $scope.connectors = data;
	        $scope.loadConfigs = function() {
				$scope.connectorid = this.connector.id;
				$scope.selectedConnector = this.connector.configurations;
				$scope.configurations = this.connector.configurations;
			}
	});
	$http.get('http://localhost:3000/fields').success(function(data) {
		$scope.fields = data;
	});
	$scope.submit = function(update) {
		var updated = {"configurations":update};

		$http.put('http://localhost:3000/connectors/'+ $scope.connectorid, updated).success(function() {
			alert("Your configurations have been updated");
		});
	}
}]);