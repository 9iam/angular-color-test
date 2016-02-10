'use strict';

angular.module('myApp.questionsResolver', [
])

.factory('questionsResolver', ['questionsProvider', function(questionsProvider) {
    var isRightSelected = function(variants) {
        var result = true;
        for (var v in variants) {
            if ((!!variants[v].selected) != (variants[v].isRight)) {
                result = false;
            }
        }
        return result;
    }    

    this.getResult = function() {
        var questions = questionsProvider.getQuestions();
        var countRight = 0;
        for (var q in questions) {
            if (isRightSelected(questions[q].variants)) {
                countRight++;
            }
        }
        return {right: countRight, overall: questions.length};
    }
    return this;
}]);
