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

    $scope.addItem = function(item, count)
    {
      console.log("Item name: " + item)
      console.log("Item count: " + count)

      if (count === undefined || count === null)
      {
        count = 1
      }
      var newProduct = { item: item.toUpperCase(), count: count }

      $http.post('http://inventory-backend.herokuapp.com/inventory', newProduct)
        .success(function (newProduct)
        {
          $scope.inventory_list.push(newProduct);
          $scope.item = null
          $scope.count = null
        });
    }

    $scope.increaseItem = function(index)
    {
      console.log('Increasing element with index: ' + index)
      $scope.inventory_list[index].count +=1
    }

    $scope.decreaseItem = function(index)
    {
      console.log('Decreasing element with index: ' + index)
      $scope.inventory_list[index].count -=1

      if($scope.inventory_list[index].count == 0)
      {
        console.log('Element with index: ' + index + ' reached zero: deleting')
        $scope.deleteItem(index);
      }
    }

    $scope.deleteItem = function(index)
    {
      console.log('Deleting element with index: ' + index)
      $scope.inventory_list.splice(index, 1);
    }

}]);
