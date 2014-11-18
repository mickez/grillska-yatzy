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

    });

angular.module('yatzy.utils', []);