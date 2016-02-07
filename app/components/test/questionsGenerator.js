'use strict';

angular.module('myApp.questionsGenerator', [
])

.factory('questionsGenerator', function() {
    var shades = {
        pink: {
            pink: '#F69ACD',
            rose: '#FC94AD',
            fuscia: '#FC46AA',
            punch: '#F15278',
            blush: '#FEC5E5',
            watermelon: '#FE7F9C',
            flamingo: '#FDA4B8',
            rouge: '#F26B8B',
            salmon: '#FDAB9F',
            coral: '#FE7D68',
            peach: '#FB9483',
            strawberry: '#FC4C4E',
            rosewood: '#A04242',
            lemonade: '#FBBBCB',
            taffy: '#FA86C5',
            bubblegum: '#FD5CA8',
            'ballet slipper': '#F69ABF',
            crepe: '#F2B8C6',
            magenta: '#E11584',
            'hot pink': '#E11584'
        }
    };
    // info from http://digitalsynopsis.com/design/color-thesaurus-correct-names-of-shades/

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomShadeWhichIsNot(shades, exception) {
        var keys = Object.keys(shades), randomKey;                 // <- probably not supported in some browsers
        do {
            randomKey = keys[getRandomInt(0, keys.length-1)];
        }
        while (randomKey == exception)
        return randomKey;
    }

    function getPseudoRandomNextElement(k, n) {
        console.log('Getting next element after ', k, ' mod ', n);
        var randInt = getRandomInt(1, 3);
        var pseudoRandInc = randInt == 1 ? 3 :
            (randInt == 2 ? 7 : 11);
        console.log('pseudoRandInc == ', pseudoRandInc);
        return (k + pseudoRandInc) % n;
    }

    function getColorQuestion(shades, baseShade, numVariants, number) {
        var question = {
            question: 'Which color is ' + baseShade + '?',
            variants: []
        };

        if (number) {
            question.number = number;
        }

        var keys = Object.keys(shades);
        console.log('keys:', keys);
        var k = keys.indexOf(baseShade);
        console.log('k:', k);
        for (var i=0; i < numVariants; i++) {
            //var randomShade = getRandomShadeWhichIsNot(shades, baseShade);
            var randomShade = keys[k=getPseudoRandomNextElement(k, keys.length)];
            question.variants.push({
                text: randomShade,
                color: shades[randomShade],
                isRight: false
            });
        }

        var theVariantIndex = getRandomInt(0, numVariants-1);;
        question.variants[theVariantIndex] = {
            text: baseShade,
            color: shades[baseShade],
            isRight: true
        };

        return question;
    }

    this.getQuestions = function() {
        var numQuestions = 10, numVariants = 2;
        var result = [];
        var keys = Object.keys(shades.pink);
        for (var j=0; j < numQuestions; j++) {
            var key = keys[j%keys.length];            
            result.push(getColorQuestion(shades.pink, key, numVariants, j+1));
            numVariants += 2;
        }
        return result;
    }

    return this;
});