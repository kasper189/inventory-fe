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


    $http.get('http://inventory-be.herokuapp.com/inventory').
      success(function(data) {
      console.log("Found: " + data)
        $scope.inventory_list = data;
    });

    $scope.addItem = function(name, count)
    {
      console.log("Item name: " + name)
      console.log("Item count: " + count)

      if (count === undefined || count === null)
      {
        count = 0
      }

      console.log('Item name: ' + name)
      console.log('Item count: ' + count)

      var newProduct = { name: name.toUpperCase(), count: count }

      $http.post('http://inventory-be.herokuapp.com/inventory', newProduct)
        .success(function(newProduct)
        {
          console.log('Added item has id: ' + newProduct.id)
          $scope.inventory_list.push(newProduct);
          $scope.item = null
          $scope.count = null
        });
    }

    $scope.increaseItem = function(item_id)
    {
      console.log('Increasing element with id: ' + item_id)

			var index = $scope.findItem(item_id)

			if(index !== undefined)
			{
	      var item_count = parseInt($scope.inventory_list[index].count) + 1
	      var item_id = $scope.inventory_list[index].id

	      console.log('Item count: ' + item_count)
	      console.log('Item id: ' + item_id)

	      $http.put('http://inventory-be.herokuapp.com/item/' + item_id, { 'count': item_count })
	        .success(function(updated_product)
	        {
	          console.log('Received item after update: ' + updated_product)
	          $scope.inventory_list[index].count = updated_product.count
	        });
			}
    }

    $scope.decreaseItem = function(item_id)
    {
      console.log('Decreasing element with index: ' + item_id)

			var index = $scope.findItem(item_id)

			if(index !== undefined)
			{
				var item_count = parseInt($scope.inventory_list[index].count) - 1
				var item_id = $scope.inventory_list[index].id

				console.log('Item count: ' + item_count)
				console.log('Item id: ' + item_id)

				$http.put('http://inventory-be.herokuapp.com/item/' + item_id, { 'count': item_count })
					.success(function(updated_product)
					{
						console.log('Received item after update: ' + updated_product)
						$scope.inventory_list[index].count = updated_product.count
					});
			}
    }

    $scope.deleteItem = function(item_id)
    {
      console.log('Deleting element with index: ' + item_id)

			var index = $scope.findItem(item_id)

			if(index !== undefined)
			{
				var item_id = $scope.inventory_list[index].id

				$http.delete('http://inventory-be.herokuapp.com/item/' + item_id)
					.success(function(deleted_message)
					{
						if(deleted_message.status !== undefined && deleted_message.status === "deleted") {
							console.log('Item successfully deleted: ' + item_id)
							$scope.inventory_list.splice(index, 1);
						}
					});
			}
    }

		$scope.findItem = function(id)
    {
      console.log('Finding element with id: ' + id)

			for (var i = 0; i < $scope.inventory_list.length; i++)
			{
				if($scope.inventory_list[i].id === id)
				{
					console.log('Element found with position: ' + i)
					return i
				}
			}
			console.log('Element NOT found')
    }

}]);
