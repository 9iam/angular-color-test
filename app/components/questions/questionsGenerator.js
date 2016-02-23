'use strict';

angular.module('myApp.questionsGenerator', [
])

.factory('questionsGenerator', ['settings', function(settings) {
    var activeShade = settings.activeShade;

    var shades = {
        white: {
            'White': '#FFFFFF',
            'Whitesmoke': '#F5F5F5',
            'Snow': '#FFFAFA',
            'Honeydew': '#F0FFF0',
            'Mintcream': '#F5FFFA',
            'Azure': '#F0FFFF',
            'Aliceblue': '#F0F8FF',
            'Ghostwhite': '#F8F8FF',
            'Seashell': '#FFF5EE',
            'Beige': '#F5F5DC',
            'Oldlace': '#FDF5E6',
            'Floralwhite': '#FFFAF0',
            'Ivory': '#FFFFF0',
            'Antiquewhite': '#FAEBD7',
            'Linen': '#FAF0E6',
            'Lavenderblush': '#FFF0F5'
        },  // info from wikipedia
        pink: {
            Pink: '#F69ACD',
            Rose: '#FC94AD',
            Fuscia: '#FC46AA',
            Punch: '#F15278',
            Blush: '#FEC5E5',
            Watermelon: '#FE7F9C',
            Flamingo: '#FDA4B8',
            Rouge: '#F26B8B',
            Salmon: '#FDAB9F',
            Coral: '#FE7D68',
            Peach: '#FB9483',
            Strawberry: '#FC4C4E',
            Rosewood: '#A04242',
            Lemonade: '#FBBBCB',
            Taffy: '#FA86C5',
            Bubblegum: '#FD5CA8',
            'Ballet slipper': '#F69ABF',
            Crepe: '#F2B8C6',
            Magenta: '#E11584',
            'Hot pink': '#E11584'
        }  // info from http://digitalsynopsis.com/design/color-thesaurus-correct-names-of-shades/
    };    

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
        var randInt = getRandomInt(1, 3);
        var pseudoRandInc = randInt == 1 ? 3 :
            (randInt == 2 ? 7 : 11);
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
        var k = keys.indexOf(baseShade);
        for (var i=0; i < numVariants; i++) {
            var randomShade = keys[k=getPseudoRandomNextElement(k, keys.length)];
            question.variants.push({
                text: randomShade,
                color: shades[randomShade],
                isRight: randomShade == baseShade
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
        console.log('activeShade is', activeShade);
        var numQuestions = settings.maxNumberOfQuestions,
            numVariants = settings.initialNumberOfVariants,
            result = [],
            keys = Object.keys(shades[activeShade]),
            offset = settings.offset;
        for (var j=0; j < numQuestions; j++) {
            var key = keys[(j+offset)%keys.length];            
            result.push(getColorQuestion(shades[activeShade], key, numVariants, j+1));
            numVariants += 1;
        }
        return result;
    }

    return this;
}]);