(function() {
    'use strict';

    angular
        .module('app')
        .factory('orderFactory', orderFactory);

    orderFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

    /* @ngInject */
    function orderFactory($http, $q, CRUDFactory, apiUrl) {
    	return service;
	}
})();