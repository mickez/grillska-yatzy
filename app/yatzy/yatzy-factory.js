(function() {
    'use strict';
    
    var game;

    angular.module('yatzy')
        .factory(function() {            
            if (typeof game === 'undefined') {
                return new window.grillskaYatzy.game();
            }
        });

})();