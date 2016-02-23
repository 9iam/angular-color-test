'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/colors/:colorId?/:offset?', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$route', '$location', 'questionsProvider', 'questionsResolver', function($scope, $route, $location, questionsProvider, questionsResolver) {    

    $scope.getMainButtonCaption = function() {
        return questionsProvider.hasMoreQuestions() ? 'Next' : 'Finish';
    };   

    $scope.question = questionsProvider.getCurrentQuestion();

    $scope.questions = {
        moveToNext: function() {
            if (questionsProvider.hasMoreQuestions()) {
                $scope.question = questionsProvider.getNextQuestion();
            } else {
                console.log('No more questions');
                $location.path('/results');
            }
        },

        moveToPrevious: function() {
            if (!questionsProvider.isFirstQuestion()) {
                $scope.question = questionsProvider.getPreviousQuestion();
            } else {
                console.log('First question, can\'t go back');
            }
        },

        hasMore: function() {
            return questionsProvider.hasMoreQuestions();
        },

        isFirst: function() {
            return questionsProvider.isFirstQuestion();
        }        
    };   

    $scope.variants = {
        getTitle: function(variant) {
            //FIXME: it's not working the way intended from ng-title
            return $scope.question.variantIsChosen ? variant.text : '';
        },

        clicked: function(variant) {        
            variant.selected = true;
            $scope.question.variantIsChosen = variant;
        },

        instantResult: function(variant) {
            return questionsResolver.instantResult(variant);        
        }
    };

}]);