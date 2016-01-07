'use strict';

angular.module('myApp.questionsResolver', [
])

.factory('questionsResolver', ['questionsProvider', function(questionsProvider) {
    var isRight = function(variants) {
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
            if (isRight(questions[q].variants)) {
                countRight++;
            }
        }
        return 'Right: ' + countRight + ' out of ' + questions.length;
    }
    return this;
}]);
