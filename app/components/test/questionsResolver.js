'use strict';

angular.module('myApp.questionsResolver', [
])

.factory('questionsResolver', ['questionsProvider', function(questionsProvider) {    
    var isRightSelected = function(variants) {
        for (var v in variants) {
            if ((!!variants[v].selected) != (variants[v].isRight)) {
                return null;
            } else if (!!variants[v].selected && variants[v].isRight) {
                // there can be only one right variant for now
                return variants[v];
            }
        }
        return null;
    }    

    this.getOveralVariantsCount = function() {
        return questionsProvider.getQuestions().length;
    }

    this.getRightVariants = function() {
        var questions = questionsProvider.getQuestions();
        var result = [];
        for (var q in questions) {
            var rightVariant = isRightSelected(questions[q].variants);
            if (rightVariant) {
                result.push(rightVariant);
            }
        }
        return result;
    }

    this.instantResult = function(variant){
        if (!!variant.selected) {
            if (variant.isRight) {
                return '⇐ Yes, it\'s ' + '"' + variant.text + '"!';
            } else {
                return '⇍ Sorry, it\'s ' + '"' + variant.text + '"';
            }            
        }
        return '';
    }

    return this;
}]);
