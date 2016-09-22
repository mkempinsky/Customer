(function(){
	'use strict';

	angular
		.module('app')
		.controller('RestaurantListController', RestaurantListController);

	RestaurantListController.$inject = ['$stateParams', 'restaurantFactory'];

	function RestaurantListController($stateParams, restaurantFactory){
		var vm = this;

		vm.allRestaurants = [];
		vm.restaurantId = $stateParams.restaurantId;
		getAllRestaurants();

/*************************************************************************/
		function getAllRestaurants(){
			restaurantFactory.getAll().then(
				function(data){
					vm.allRestaurants = data;
					console.log(vm.allRestaurants);
				},
				function(error){
					console.log(error);
				}
			);
		}	
	}
})();
