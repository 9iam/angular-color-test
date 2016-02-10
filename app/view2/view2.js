'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', 'questionsResolver', function($scope, questionsResolver) {
    $scope.getRightVariants = function() {
        return questionsResolver.getRightVariants();
    };

    $scope.getOveralVariantsCount = function() {
    	return questionsResolver.getOveralVariantsCount();
    };

    $scope.instantResult = function(v) {
    	return questionsResolver.instantResult(v);
    };
}]);