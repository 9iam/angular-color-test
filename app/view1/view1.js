'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/colors/:colorId?', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$route', '$location', 'questionsProvider', 'questionsResolver', function($scope, $route, $location, questionsProvider, questionsResolver) {    
    $scope.variantClicked = function(variant) {
        $scope.question.variantIsChosen = true;
        console.log(variant);
        console.log($scope.question);
    }

    $scope.instantResult = function(variant){
        if (!!variant.selected) {
            if (variant.isRight) {
                return '⇐ Yes, it\'s ' + '"' + variant.text + '"!';
            } else {
                return '⇍ Sorry, it\'s ' + '"' + variant.text + '"';
            }            
        }
        return '';        
    }

    $scope.question = questionsProvider.getCurrentQuestion();

    $scope.moveToNextQuestion = function() {
        if (questionsProvider.hasMoreQuestions()) {
            $scope.question = questionsProvider.getNextQuestion();
        } else {
            console.log('No more questions');
            console.log(questionsResolver.getResult());
            $location.path('/view2');
        }
    };

    $scope.moveToPreviousQuestion = function() {
        if (!questionsProvider.isFirstQuestion()) {
            $scope.question = questionsProvider.getPreviousQuestion();
        } else {
            console.log('First question, can\'t go back');
            console.log(questionsResolver.getResult());
        }
    };

    $scope.hasMoreQuestions = function() {
        return questionsProvider.hasMoreQuestions();
    };

    $scope.isFirstQuestion = function() {
        return questionsProvider.isFirstQuestion();
    };

    $scope.getMainButtonCaption = function() {
        return questionsProvider.hasMoreQuestions() ? 'Next' : 'Finish';
    };

    $scope.getVariantTitle = function(variant) {
        return $scope.question.variantIsChosen ? variant.text : '';
    };
}]);