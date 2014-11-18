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
                    var nPlayers = $scope.nPlayers = {
                        value: NaN
                    };
                    var maxPlayers = $scope.maxPlayers = 10;


                    var addPlayer = $scope.addPlayer = function() {
                        players.push(new yatzyPlayer('Spelare ' + (players.length + 1)));
                    };

                    var playerUpdate = $scope.playerUpdate = function() {
                        var index, howMany;
                        if (nPlayers.value > players.length) {
                            howMany = nPlayers.value - players.length;

                            for (var i = 0; i < howMany; i++) {
                                addPlayer();
                            }

                        } else if (isNaN(nPlayers.value)) {
                            players.splice(0, 1000);
                        } else {
                            index = nPlayers.value;
                            howMany = players.length - index;
                            players.splice(index, howMany);
                        }
                    };

                    playerUpdate();

                    var play = $scope.play = function() {
                        $scope.callback(players);
                    };

                },
                link: function(scope, elem, attr) {
                    console.log('newGame directive initializing');
                }
            };
        });

})();
