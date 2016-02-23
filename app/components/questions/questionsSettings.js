'use strict';

angular.module('myApp.questionsSettings', [
	'myApp.questionsGenerator'
])

.service('settings', ['$route', function($route) {
	return {		
		maxNumberOfQuestions: 9,
		initialNumberOfVariants: 2,
		offset: $route.current.params.offset || 0, // if non-zero, will continue from the active+offset
		activeShade: $route.current.params.colorId || 'pink'
	};
}]);