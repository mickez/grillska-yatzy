(function() {

    var player = function(name) {
        this.name = name;
        this.ones = undefined;
        this.twos = undefined;
        this.threes = undefined;
        this.fours = undefined;
        this.fives = undefined;
        this.sixes = undefined;

        this.pair = undefined;
        this.twoPair = undefined;
        this.triplet = undefined;
        this.quadruplet = undefined;
        this.ladderSmall = undefined;
        this.ladderLarge = undefined;
        this.fullHouse = undefined;
        this.chance = undefined;
        this.yatzy = undefined;
    }

    player.prototype.getSum = function() {
        var sum = 0;
        sum += this.ones || 0;
        sum += this.twos || 0;
        sum += this.threes || 0;
        sum += this.fours || 0;
        sum += this.fives || 0;
        sum += this.sixes || 0;
        return sum;
    }

    player.prototype.getTotal = function(first_argument) {
        var total = this.sum();
        total += this.pair || 0;
        total += this.twoPair || 0;
        total += this.triplet || 0;
        total += this.quadruplet || 0;
        total += this.ladderSmall || 0;
        total += this.ladderLarge || 0;
        total += this.fullHouse || 0;
        total += this.chance || 0;
        total += this.yatzy || 0;
        return total;
    };


    player.prototype.setChance = function(d1, d2, d3, d4, d5) {
        var total = 0;
        total += d1;
        total += d2;
        total += d3;
        total += d4;
        total += d5;
        return total;
    }
    player.prototype.setYatzy = function(d1, d2, d3, d4, d5) {
        if (d1 === d2 &&
            d2 === d3 &&
            d3 === d4 &&
            d4 === d5) {
            this.yatzy = 50;
        } else {
            this.yatzy = 0;
        }
    }
    player.prototype.setOnes = function(d1, d2, d3, d4, d5) {
        var sum = 0;
        if (d1 == 1) sum++;
        if (d2 == 1) sum++;
        if (d3 == 1) sum++;
        if (d4 == 1) sum++;
        if (d5 == 1) sum++;
        this.ones = sum;
    }
    player.prototype.setTwos = function(d1, d2, d3, d4, d5) {
        var sum = 0;
        if (d1 == 2) sum += 2;
        if (d2 == 2) sum += 2;
        if (d3 == 2) sum += 2;
        if (d4 == 2) sum += 2;
        if (d5 == 2) sum += 2;
        this.twos = sum;
    }
    player.prototype.setThrees = function(d1, d2, d3, d4, d5) {
        var s;
        s = 0;
        if (d1 == 3) s += 3;
        if (d2 == 3) s += 3;
        if (d3 == 3) s += 3;
        if (d4 == 3) s += 3;
        if (d5 == 3) s += 3;
        this.threes = s;
    }
    player.prototype.setFours = function(d1, d2, d3, d4, d5) {
        var sum = 0;
        if (d1 == 4) sum += 4;
        if (d2 == 4) sum += 4;
        if (d3 == 4) sum += 4;
        if (d4 == 4) sum += 4;
        if (d5 == 4) sum += 4;
        this.fours = sum;
    }
    player.prototype.setFives = function(d1, d2, d3, d4, d5) {
        var sum = 0;
        if (d1 == 5) sum += 5;
        if (d2 == 5) sum += 5;
        if (d3 == 5) sum += 5;
        if (d4 == 5) sum += 5;
        if (d5 == 5) sum += 5;
        this.fives = sum;
    }
    player.prototype.setSixes = function(d1, d2, d3, d4, d5) {
        var s;
        s = 0;
        if (d1 == 6) s += 6;
        if (d2 == 6) s += 6;
        if (d3 == 6) s += 6;
        if (d4 == 6) s += 6;
        if (d5 == 6) s += 6;
        this.sixes = s;
    }
    player.prototype.setPair = function(d1, d2, d3, d4, d5) {
        var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        counts[d1 - 1]++;
        counts[d2 - 1]++;
        counts[d3 - 1]++;
        counts[d4 - 1]++;
        counts[d5 - 1]++;
        var at;
        for (at = 0; at != 6; at++) {
            if (counts[6 - at - 1] >= 2) {
                this.pair = (6 - at) * 2;
            }
        }

        this.pair = 0;
    }
    player.prototype.setTwoPair = function(d1, d2, d3, d4, d5) {
        var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        counts[d1 - 1]++;
        counts[d2 - 1]++
        counts[d3 - 1]++
        counts[d4 - 1]++;
        counts[d5 - 1]++;
        var n = 0;
        var score = 0;
        for (i = 0; i < 6; i += 1) {
            if (counts[6 - i - 1] >= 2) {
                n++;
                score += (6 - i);
            }
        }
        if (n == 2) {
            this.twoPair = score * 2;
        }
        else {
            this.twoPair = 0;
        }

    }
    player.prototype.setQuadruplet = function(_1, _2, d3, d4, d5) {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0, 0]
        tallies[_1 - 1]++;
        tallies[_2 - 1]++;
        tallies[d3 - 1]++;
        tallies[d4 - 1]++;
        tallies[d5 - 1]++;
        for (i = 0; i < 6; i++) {
            if (tallies[i] >= 4) {
                this.quadruplet = (i + 1) * 4;
            }
        }

        this.quadruplet = 0;
    }
    player.prototype.setTriplet = function(d1, d2, d3, d4, d5) {
        var t;
        t = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        t[d1 - 1]++;
        t[d2 - 1]++;
        t[d3 - 1]++;
        t[d4 - 1]++;
        t[d5 - 1]++;
        for (i = 0; i < 6; i++) {
            if (t[i] >= 3) {
                this.triplet = (i + 1) * 3;
            }
        }

        this.triplet = 0;
    }
    player.prototype.setLadderSmall = function(d1, d2, d3, d4, d5) {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0]
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        if (tallies[0] == 1 &&
            tallies[1] == 1 &&
            tallies[2] == 1 &&
            tallies[3] == 1 &&
            tallies[4] == 1) {

            this.ladderSmall = 15;
        }
        this.ladderSmall = 0;
    }
    player.prototype.setLadderLarge = function(d1, d2, d3, d4, d5) {
        var tallies;
        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        if (tallies[1] == 1 &&
            tallies[2] == 1 &&
            tallies[3] == 1 &&
            tallies[4] == 1 && tallies[5] == 1) {
            
            this.ladderLarge = 20;
        }
        this.ladderLarge = 0;
    }
    player.prototype.setfullHouse = function(d1, d2, d3, d4, d5) {
        var tallies;
        var _2 = false;
        var i;
        var _2_at = 0;
        var _3 = false;
        var _3_at = 0;
        tallies = [0, 0, 0, 0, 0, 0, 0, 0];
        tallies[d1 - 1] += 1;
        tallies[d2 - 1] += 1;
        tallies[d3 - 1] += 1;
        tallies[d4 - 1] += 1;
        tallies[d5 - 1] += 1;
        for (i = 0; i != 6; i += 1) {

            if (tallies[i] == 2) {
                _2 = true;
                _2_at = i + 1;
            }
        }
        for (i = 0; i != 6; i += 1) {

            if (tallies[i] == 3) {
                _3 = true;
                _3_at = i + 1;
            }
        }
        if (_2 && _3) {
            this.fullHouse = _2_at * 2 + _3_at * 3;
        } else {
            this.fullHouse = 0;
        }
    }

    window.grillskaYatzy.player = player;

})();
