(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$stateParams'];

    /* @ngInject */
    function LoginController($state, $stateParams) {
        var vm = this;
        vm.title = 'LoginController';
        vm.loginInfo = {};
        vm.loginCustomer = loginCustomer;
        ////////////////

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