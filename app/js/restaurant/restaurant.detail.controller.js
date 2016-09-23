(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailController', RestaurantDetailController);

    RestaurantDetailController.$inject = ['$stateParams', '$state', 'restaurantFactory', 'StripePaymentFactory'];

    /* @ngInject */
    function RestaurantDetailController($stateParams, $state, restaurantFactory, StripePaymentFactory) {
        var vm = this;
        vm.title = 'restaurantDetailController';
        vm.menu = {};
        vm.newReviewDescription = "";
        vm.newReviewRating;
        vm.addReview = addReview;
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

        ////////////////

        function addToCart(item) {
            vm.cart.items.push(angular.copy(item));
        }

        ////////////////

        function addReview () {
            vm.newReview = {
                //No customer id at ALL on this site//
                customerId: 3,
                restaurantId: $stateParams.restaurantId,
                reviewDescription: vm.newReviewDescription,
                rating: vm.newReviewRating
            };
            reviewFactory.add(vm.newReview).then(
                function(){
                    alert('Review added');
                    console.log(vm.newReview);
                }
                );
        }

        function removeItem(item) {
            var index = vm.cart.items.indexOf(item);
            vm.cart.items.splice(index, 1);
        }

        function doCheckout(token) {
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
        }
    }
})();

// function removeItem(item) {
//             vm.cart.items.splice(indexOf(item), 1);
//         }