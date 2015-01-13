angular.module('yatzy', ['ngAnimate', 'yatzy.newGame', 'ngFx', 'yatzy.utils', 'yatzy.dice'])
    .controller('main', function($scope, $timeout, yatzy) {
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

        // $scope.newGameCallback(['micke', 'johan']);

        $scope.getCurrentScreen = function() {
            if (yatzy.state === yatzy.states['NEW_GAME']) {
                return 'newGame';
            } else {
                return 'game';
            }
        };

        $scope.callHelper = function(index, func) {
            if (index !== yatzy.turn) {
                return;
            }

            var dices = yatzy.dices.dices;
            $scope.yatzy.players[index][func](dices[0].value, dices[1].value, dices[2].value, dices[3].value, dices[4].value);


        };

        $scope.getCurrentPlayer = function() {
            return yatzy.players[yatzy.turn];
        };

        $scope.getInstruction = function() {
            switch (yatzy.state) {
                case yatzy.states['ROLL_FIRST']:
                    return 'Tryck på knappen nedan för att kasta dina tärningar';
                case yatzy.states['ROLL_PICK']:
                    return 'Välj att kasta dina tärningar igen eller lås dina poäng i tabellen';
                case yatzy.states['NEXT_PLAYER']:
                    return 'Tryck på \'fortsätt\' för att låta nästa spelare köra';
            }
        };

        $scope.canPick = function() {
            return yatzy.state === yatzy.states['ROLL_PICK'] || yatzy.state === yatzy.states['PICK'];
        };

        $scope.canRoll = function() {
            return yatzy.state === yatzy.states['ROLL_PICK'] || yatzy.state === yatzy.states['ROLL_FIRST'];
        };

        $scope.isControlsVisible = function() {
            return $scope.canRoll();
        };

    });

angular.module('yatzy.utils', []);