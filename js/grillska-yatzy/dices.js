(function() {
    'use strict';

    var dices = function() {
        this.nDices = 5;
        this.rolls = 0;

        this.dices = [];

        for (var i = 0; i < this.nDices; i++) {
            this.dices.push({
                value: -1,
                locked: false
            });
        }

        this.reset();
    };

    dices.prototype.roll = function() {
        if (this.rolls === 3) {
            return false;
        }

        function rndInteger() {
            // Random float 0<=rnd<1
            var rnd = Math.random();
            // Range it to 0<=rnd<6
            rnd *= 6;
            // Floot it and convert to int. Range 0-5
            rnd = Math.floor(rnd) + 1;

            return rnd;
        }

        for (var i = 0; i < this.nDices; i++) {
            if (!this.dices[i].locked || this.dices[i].value === -1) {
                this.dices[i].value = rndInteger();
            }
        }

        this.rolls += 1;

        return true;
    };

    dices.prototype.remainingRolls = function() {
        return 3 - this.rolls;
    };

    dices.prototype.allowRoll = function() {
        return this.rolls < 3;
    };

    dices.prototype.reset = function() {
        this.rolls = 0;
        for (var i = 0; i < this.nDices; i++) {
            this.dices[i].value = -1;
            this.dices[i].locked = false;
        }
    };

    window.grillskaYatzy.dices = dices;

})();