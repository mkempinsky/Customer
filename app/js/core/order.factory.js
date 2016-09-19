(function() {
    'use strict';

    angular
        .module('app')
        .factory('OrderFactory', OrderFactory);

    Orderfactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

    /* @ngInject */
    function OrderFactory($http, $q, CRUDFactory, apiUrl) {
    	return service;
	}
})();