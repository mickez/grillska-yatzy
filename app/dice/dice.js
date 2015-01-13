(function() {
    angular.module('yatzy.dice', [])
        .directive('dice', function() {
            return {
                restrict: 'E',
                templateUrl: '/app/dice/dice.html',
                scope: {
                    'value': '='
                },
                link: function(scope, elem, attrs) {
                    scope.getClass = function() {
                        switch (scope.value) {
                            case 1:
                                return 'one';
                            case 2:
                                return 'two';
                            case 3:
                                return 'three';
                            case 4:
                                return 'four';
                            case 5:
                                return 'five';
                            case 6:
                                return 'six';
                            default:
                                return '';
                        }
                    };
                }
            };
        });
})();