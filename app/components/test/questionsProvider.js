'use strict';

angular.module('myApp.questionsProvider', [
])

.factory('questionsProvider', function() {
    var questions = [
    {
        number: 1,
        question: 'Do you like me?',
        variants: [
        {
            text: 'blah blah',
            isRight: true,
        }, {
            text: 'blah blah',
            isRight: false,
        },  {
            text: 'blah blah',
            isRight: false,
        }]
    }, {
         number: 2,
         question: 'What do you prefer to drink today?',
         variants: [
         {
             text: 'Water',
             isRight: false,
         }, {
             text: 'Cola',
             isRight: false,
         },  {
             text: 'Whiskey',
             isRight: true,
         }]
    }];

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

    return this;
});
