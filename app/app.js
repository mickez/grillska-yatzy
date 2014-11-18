angular.module('yatzy', ['ngAnimate', 'yatzy.newGame', 'ngFx', 'yatzy.utils'])
    .controller('main', function($scope, yatzy) {
        $scope.meta = {};
        $scope.meta.title = 'GRILLSKA YATZY';

        $scope.yatzy = yatzy;

        $scope.newGameCallback = function(players) {
            var names = [];
            for (var i = 0; i < players.length; i++) {
                names.push(players[i].name);
            }
            yatzy.init(names, names.length);
        };

        $scope.newGameCallback(['micke', 'johan']);

        $scope.getCurrentScreen = function() {
            if (yatzy.state === yatzy.states['NEW_GAME']) {
                return 'newGame';
            } else {
                return 'game';
            }
        };

        $scope.callHelper = function(index, func) {
            var dices = yatzy.dices.dices;
            $scope.yatzy.players[index][func](dices[0].value, dices[1].value, dices[2].value, dices[3].value, dices[4].value, dices[5].value);
        };

    });

angular.module('yatzy.utils', []);