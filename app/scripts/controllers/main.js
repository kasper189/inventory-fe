'use strict';
/**
 * @ngdoc function
 * @name inventoryFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryFeApp
 */
angular.module('inventoryFeApp')
	.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {


    $http.get('http://inventory-backend.herokuapp.com/inventory').
      success(function(data) {
      console.log("Found: " + data)
        $scope.inventory_list = data;
    });

    //$scope.addItem = function(item, count) {
    //  $scope.inventory_list.push( { item: item.toUpperCase(), count: count } );
    //}

    $scope.addItem = function(item, count)
    {
      var newProduct = { item: item.toUpperCase(), count: count }
      $http.post('http://inventory-backend.herokuapp.com/inventory', newProduct)
        .success(function (newProduct)
        {
          $scope.inventory_list.push(newProduct);
        });
    }

}]);
