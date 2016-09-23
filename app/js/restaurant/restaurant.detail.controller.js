(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailController', RestaurantDetailController);

    RestaurantDetailController.$inject = ['$stateParams', '$state', 'restaurantFactory', 'OrderFactory', 'OrderItemFactory', 'StripePaymentFactory'];

    /* @ngInject */
    function RestaurantDetailController($stateParams, $state, restaurantFactory, OrderFactory, OrderItemFactory, StripePaymentFactory) {
        var vm = this;
        vm.title = 'restaurantDetailController';
        vm.menu = {};
        vm.addToCart = addToCart;
        vm.restaurantId = $stateParams.restaurantId;
        vm.removeItem = removeItem;
        vm.doCheckout = doCheckout;
        getMenu();

        ////////////////

        function getMenu() {
            restaurantFactory.getById($stateParams.restaurantId).then(
            function(response) {
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

        function removeItem(item) {
            var index = vm.cart.items.indexOf(item);
            vm.cart.items.splice(index, 1);
        }

        function doCheckout(token) {
            // create order in database
            // create order items in database
            // pay in stripe
            // add payment to database
            var order = {
                restaurantId: $stateParams.restaurantId,
                customerId: 20,
                timeStamp: new Date()
            };

            OrderFactory.add(order).then(function(data) {
                for(var i = 0; i < vm.cart.items.length; i++) {
                    var item = vm.cart.items[i];
                    
                    var orderItem = {
                        menuItemId: item.menuItemId,
                        orderId: data.orderId
                    };
                    OrderItemFactory.add(orderItem);
                }

                var payInfo = {
                    "token": token.id,
                    "orderAmount": parseInt(vm.cart.cost() * 100),
                    "description": vm.menu.name
                };

                StripePaymentFactory.add(payInfo)
                    .then(function(data){
                        vm.allRestaurants = data;
                        console.log(vm.allRestaurants);
                     },
                     function(error){
                        console.log(error);
                     }
                );
            });
        }
    }
})();

// function removeItem(item) {
//             vm.cart.items.splice(indexOf(item), 1);
//         }