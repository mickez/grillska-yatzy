(function() {
    'use strict';

    angular.module('yatzy.newGame', [])
        .directive('newGame', function(yatzy) {

            return {
                restrict: 'E',
                scope: {
                    callback: '='
                },
                templateUrl: '/app/newGame/newGame.html',
                controller: function($scope, yatzyPlayer) {
                    var players = $scope.players = [];

                    var addPlayer = $scope.addPlayer = function() {
                        players.push(new yatzyPlayer('Player ' + (players.length + 1)));
                    }

                    var allowMore = $scope.allowMore = function() {
                        return players.length < 6;
                    }

                    addPlayer();

                },
                link: function(scope, elem, attr) {
                    console.log('newGame directive initializing');
                }
            }
        });

})();