;'use strict';

angular.module('myApp.questionsProvider', [
])

.factory('questionsProvider', ['questionsGenerator', function(questionsGenerator) {
    var questions = questionsGenerator.getQuestions();

    var currentQuestion = 0;

    this.getQuestions = function() {
        return questions;
    }

    this.getNextQuestion = function() {
        return questions[++currentQuestion];
    }

    this.getCurrentQuestion = function() {
        return questions[currentQuestion];
    }

    this.hasMoreQuestions = function() {
        return currentQuestion < questions.length - 1;
    }

    this.isFirstQuestion = function() {
        return currentQuestion == 0;
    }

    this.getPreviousQuestion = function() {
        return questions[--currentQuestion];
    }

    return this;
}]);