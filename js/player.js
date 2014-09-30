(function() {

    var player = function(name) {
        this.name = name;
        this.ones = undefined;
        this.twos = undefined;
        this.threes = undefined;
        this.fours = undefined;
        this.fives = undefined;
        this.sixes = undefined;
        this.sum = function() {
            var sum = 0;
            sum += this.ones || 0;
            sum += this.twos || 0;
            sum += this.threes || 0;
            sum += this.fours || 0;
            sum += this.fives || 0;
            sum += this.sixes || 0;
            return sum;
        };
        this.pair = undefined;
        this.twoPair = undefined;
        this.triplet = undefined;
        this.quadruplet = undefined;
        this.ladderSmall = undefined;
        this.ladderLarge = undefined;
        this.fullHouse = undefined;
        this.chance = undefined;
        this.yatzy = undefined;

        this.total = function() {
            var total = sum();
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
        }
    }

})();