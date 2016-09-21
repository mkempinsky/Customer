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
        vm.menu = {};
        vm.addToCart = addToCart;
        vm.restaurantId = $stateParams.restaurantId;
        getMenu();

        ////////////////

        function getMenu() {
            restaurantFactory.getById(vm.restaurantId).then(
            function(response) {
                console.log(response);
                vm.menu = response;
                 vm.cart = {
                    cost: function() {
                        if(vm.cart.items.length) {
                            return vm.cart.items.map(function(item) {
                                return item.price;
                            }).reduce(function(previousPrice, currentPrice) {
                                return previousPrice + currentPrice;
                            });
                        } else {
                            return 0;
                        }
                    },
                    items: []
                };
            },
            function(error){
            console.log(error);
            }
            );
        }
        function addToCart(item) {
            vm.cart.items.push(angular.copy(item));
        }
    }
})();