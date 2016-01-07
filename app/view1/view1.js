'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'questionsProvider', 'questionsResolver', function($scope, questionsProvider, questionsResolver) {
    $scope.killAllPeople = function() {
        return '123';
    };

    $scope.question = questionsProvider.getCurrentQuestion();

    $scope.moveToNextQuestion = function() {
        if (questionsProvider.hasMoreQuestions()) {
            $scope.question = questionsProvider.getNextQuestion();
        } else {
            console.log('No more questions');
            console.log(questionsResolver.getResult());
        }
    };

    $scope.hasMoreQuestions = function() {
        return questionsProvider.hasMoreQuestions();
    }

    $scope.getBtnCaption = function() {
        return questionsProvider.hasMoreQuestions() ? 'Next' : 'Finish';
    }
}]);