(function(){
	'use strict'

	angular
		.module('app')
		.controller('OrdersController', OrdersController);

	OrdersController.$inject =['$stateParams', 'customerFactory', 'reviewFactory'];

	function OrdersController($stateParams, customerFactory, reviewFactory){
		var vm = this;

		allOrders();

		function allOrders(){
			customerFactory.getById(3).then(
				function(data){
					vm.details = data;
					console.log(vm.details);
				}
			);
		}


	}
})();