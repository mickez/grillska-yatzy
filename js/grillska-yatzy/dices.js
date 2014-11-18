(function() {
    'use strict';

    var dices = function() {
        this.d1 = -1;
        this.d2 = -1;
        this.d3 = -1;
        this.d4 = -1;
        this.d5 = -1;

        this.rolls = 0;
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

        this.d1 = rndInteger();
        this.d2 = rndInteger();
        this.d3 = rndInteger();
        this.d4 = rndInteger();
        this.d5 = rndInteger();

        this.rolls += 1;

        return true;
    };

    dices.prototype.allowRoll = function() {
        return this.rolls < 3;
    };

    dices.prototype.reset = function() {
        this.rolls = 0;
        this.d1 = -1;
        this.d2 = -1;
        this.d3 = -1;
        this.d4 = -1;
        this.d5 = -1;
    };

    window.grillskaYatzy.dices = dices;

})();