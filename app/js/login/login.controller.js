(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$stateParams', 'customerFactory'];

    /* @ngInject */
    function LoginController($state, $stateParams, customerFactory) {
        var vm = this;
        vm.title = 'LoginController';
        vm.loginInfo = {};
        vm.loginCustomer = loginCustomer;
        vm.customers;

        allCustomers();
        ////////////////

        function allCustomers() {
            customerFactory.getAll().then(
                function(data){
                    vm.customers = data;
                }
            );
        }


        function loginCustomer() {
        	if(vm.loginInfo.password != 'butts') {
        		alert("You entered the wrong password");
        	}
        	else
        	{
        		$state.go('restaurants.list');
        	}
        }
    }
})();