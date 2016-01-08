'use strict';

angular.module('myApp.questionsGenerator', [
])

.factory('questionsGenerator', function() {
    this.getQuestions = function() {
        return [
            {
                number: 1,
                question: 'Do you like me?',
                variants: [
                {
                    text: 'Yes',
                    isRight: true,
                }, {
                    text: 'No',
                    isRight: false,
                },  {
                    text: 'Maybe',
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
    }

    return this;
});