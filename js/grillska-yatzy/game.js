(function() {
    'use strict';

    var states = {
        'ROLL_FIRST': 0,
        'ROLL_PICK': 1,
        'PICK': 2,
        'NEXT_PLAYER': 3,
        'GAME_END': 4
    }

    var game = function(nPlayers, names) {
        console.log('Initializing yatzy game');

        this.nPlayers = nPlayers;

        this.players = [];
        this.turn;
        this.dices;

        this.state;

        function init() {
            // Init players
            for (var i = 0; i < nPlayers; i++) {
                this.players.push(new window.grillskaYatzy.player(names[i] || 'Player ' + (i + 1)));
            }

            // Init dice
            this.dices = new window.grillskaYatzy.dices();

            // Init turn
            this.turn = 0;
        }

        init();
    }

    game.setNames = function(names, index) {
        if (index) {
            this.players[index].name = names;
        } else {
            for (var i = 0; i < this.nPlayers; i++) {
                this.players[i].name = names[i];
            }
        }
    }

    window.grillskaYatzy.game = game;

})();