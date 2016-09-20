(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailController', RestaurantDetailController);

    RestaurantDetailController.$inject = ['$stateParams', '$state', 'restaurantFactory'];

    /* @ngInject */
    function RestaurantDetailController($stateParams, $state, restaurantFactory) {
        var vm = this;
        vm.title = 'restaurantDetailController';
        vm.menu = [];

        getMenu();

        ////////////////

        function getMenu() {
            console.log($stateParams);
            restaurantFactory.getById(2).then(
            function(response) {
                console.log(response); 
                vm.menu = response;
            },
            function(error){
                console.log(error);
            }
            );
        }
    }
})();