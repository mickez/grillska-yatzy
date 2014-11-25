(function() {
    'use strict';

    function camelCase(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
    }

    var game = function() {
        console.log('Initializing yatzy game');

        var nPlayers = this.nPlayers = nPlayers;

        var players = this.players = [];
        var turn = this.turn = undefined;
        var dices = this.dices = undefined;

        var state = this.state = this.states['NEW_GAME'];
    };

    game.prototype.states = {
        'NEW_GAME': 0,
        'ROLL_FIRST': 1,
        'ROLL_PICK': 2,
        'PICK': 3,
        'NEXT_PLAYER': 4,
        'GAME_END': 5
    };

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

        this.state = this.states['ROLL_FIRST'];

    };

    game.prototype.nextPlayer = function() {
        this.turn = (this.turn + 1) % this.nPlayers;
        this.dices.reset();
        this.state = this.states['ROLL_FIRST'];
    };

    game.prototype.setDice = function(player, func, field) {
        if (player !== this.turn || this.dices.rolls === 0 || this.players[player][field] || this.state !== this.states['ROLL_PICK']) {
            return;
        }

        var dices = this.dices.dices;
        this.players[player][func](dices[0].value, dices[1].value, dices[2].value, dices[3].value, dices[4].value);

        this.state = this.states['NEXT_PLAYER'];

    };

    game.prototype.roll = function() {
        this.dices.roll();

        if (this.state === this.states['ROLL_FIRST']) {
            this.state = this.states['ROLL_PICK'];
        }

        if (this.state === this.states['ROLL_PICK'] && this.dices.rolls === 3) {
            this.state = this.states['PICK'];
        }
    };

    game.prototype.setNames = function(names, index) {
        if (index) {
            this.players[index].name = names;
        } else {
            for (var i = 0; i < this.nPlayers; i++) {
                this.players[i].name = names[i];
            }
        }
    };

    window.grillskaYatzy.game = game;

})();