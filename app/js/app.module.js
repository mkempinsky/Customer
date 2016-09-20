(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr'])
        .value('apiUrl', 'http://localhost:61815/api')
        .config(appConfig);

    appConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

    function appConfig($urlRouterProvider, $stateProvider) {

    	$urlRouterProvider.otherwise('/restaurants');

    	$stateProvider
    	.state('restaurants', {
            url: '/restaurants', 
            abstract: true, 
            template: '<div ui-view></div>'
        })
            .state('restaurants.list', {
                url: '/list',
                controller: 'RestaurantListController as restaurantList',
                templateUrl: 'js/restaurant/restaurantList.html'
            })
            .state('restaurants.detail', {
                url: '/detail?restaurantId',
                controller: 'RestaurantDetailController as restaurantDetail',
                templateUrl: 'js/restaurant/restaurant.detail.html'//Make sure this works
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
            
    }

})();