(function() {
    'use strict';

    angular
        .module('app')
        .controller('RestaurantDetailController', RestaurantDetailController);

    RestaurantDetailController.$inject = ['$stateParams', '$state', 'restaurantFactory', 'reviewFactory'];

    /* @ngInject */
    function RestaurantDetailController($stateParams, $state, restaurantFactory, reviewFactory) {
        var vm = this;
        vm.title = 'restaurantDetailController';
        vm.menu = {};
        vm.newReviewDescription = "";
        vm.newReviewRating;
        vm.addReview = addReview;
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

        ////////////////

        function addToCart(item) {
            vm.cart.items.push(angular.copy(item));
        }

        ////////////////

        function addReview () {
            vm.newReview = {
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
    }
})();