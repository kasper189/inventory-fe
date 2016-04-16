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

      console.log('Item name: ' + item)
      console.log('Item count: ' + count)

      var newProduct = { item: item.toUpperCase(), count: count }

      $http.post('http://inventory-backend.herokuapp.com/inventory', newProduct)
        .success(function(newProduct)
        {
          console.log('Added item has id: ' + newProduct.id)
          $scope.inventory_list.push(newProduct);
          $scope.item = null
          $scope.count = null
        });
    }

    $scope.increaseItem = function(index)
    {
      console.log('Increasing element with index: ' + index)

      var item_count = parseInt($scope.inventory_list[index].count) + 1
      var item_id = $scope.inventory_list[index].id

      console.log('Item count: ' + item_count)
      console.log('Item id: ' + item_id)

      $http.put('http://inventory-backend.herokuapp.com/item/' + item_id, { 'count': item_count })
        .success(function(updated_product)
        {
          console.log('Received item after update: ' + updated_product)
          $scope.inventory_list[index].count = updated_product.count
        });

    }

    $scope.decreaseItem = function(index)
    {
      console.log('Decreasing element with index: ' + index)

      var item_count = parseInt($scope.inventory_list[index].count) - 1
      var item_id = $scope.inventory_list[index].id

      console.log('Item count: ' + item_count)
      console.log('Item id: ' + item_id)

      $http.put('http://inventory-backend.herokuapp.com/item/' + item_id, { 'count': item_count })
        .success(function(updated_product)
        {
          console.log('Received item after update: ' + updated_product)
          $scope.inventory_list[index].count = updated_product.count
        });

    }

    $scope.deleteItem = function(index)
    {
      console.log('Deleting element with index: ' + index)
      var item_id = $scope.inventory_list[index].id

      $http.delete('http://inventory-backend.herokuapp.com/item/' + item_id)
        .success(function(deleted_message)
        {
          if(deleted_message.status !== undefined && deleted_message.status === "deleted") {
            console.log('Item successfully deleted: ' + item_id)
            $scope.inventory_list.splice(index, 1);
          }
        });
    }

}]);
