(function() {
    'use strict';

    var states = {
        'ROLL_FIRST': 0,
        'ROLL_PICK': 1,
        'PICK': 2,
        'NEXT_PLAYER': 3,
        'GAME_END': 4
    }

    var game = function() {
        console.log('Initializing yatzy game');

        var nPlayers = this.nPlayers = nPlayers;

        var players = this.players = [];
        var turn = this.turn = undefined;
        var dices = this.dices = undefined;

        var state = this.state = undefined;
    }

    game.prototype.init = function(names, nPlayers) {
        this.nPlayers = nPlayers;

        // Init players
        for (var i = 0; i < this.nPlayers; i++) {
            this.players.push(new window.grillskaYatzy.player(names[i] || 'Player ' + (i + 1)));
        }

        // Init dice
        this.dices = new window.grillskaYatzy.dices();

        // Init turn
        this.turn = 0;

    }

    game.prototype.setNames = function(names, index) {
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