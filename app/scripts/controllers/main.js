'use strict';
/**
 * @ngdoc function
 * @name inventoryFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryFeApp
 */
angular.module('inventoryFeApp')
	.controller('MainCtrl', ['$scope', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
}]);
