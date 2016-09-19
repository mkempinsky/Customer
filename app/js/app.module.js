(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr']);
        .value('apiUrl', 'http://localhost:61815/api')
        .config(appConfig);

    appConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

    function appConfig($urlRouterProvider, $stateProvider) {

    	$urlRouterProvider.otherwise('/landing');

    	$stateProvider
    	.state('landing', {
    		url: '/landing',  
    		controller: 'LandingController as landing',
    		templateUrl: 'js/landing/landing.html'
    	})
        .state('login', {
            url: '/login',  
            controller: 'LoginController as login',
            templateUrl: 'js/login/login.html'  
        })
        .state('orders', {
            url: '/orders', 
            controller: 'OrdersController as orders',
            templateUrl: 'js/orders/orders.html'
        })
        .state('restaurants', {
            url: '/restaurants', 
            controller: 'RestaurantsController as restaurants',
            templateUrl: '/js/restaurants/restaurants.html'
        });
    }

})();