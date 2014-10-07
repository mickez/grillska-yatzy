(function() {
    'use strict';
    
    var game;

    angular.module('yatzy')
        .factory('yatzy', function($window) {
            if (typeof game === 'undefined') {
                game = new $window.grillskaYatzy.game();
            }

            return game;
        })
        .factory('yatzyPlayer', function($window) {
            return $window.grillskaYatzy.player;
        });

})();