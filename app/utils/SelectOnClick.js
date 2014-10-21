(function() {
    'use strict';

    angular.module('yatzy.utils')
        .directive('selectOnFocus', function() {
            console.log('sup');
            return {
                restrict: 'A',
                link: function(scope, elem) {
                    elem.on('focus', function() {
                        elem[0].select();
                    });
                }
            };
        });

})();