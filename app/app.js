angular.module('yatzy', ['ngAnimate', 'yatzy.newGame', 'ngFx', 'yatzy.utils'])
    .controller('main', function($scope) {
        $scope.meta = {};
        $scope.meta.title = 'GRILLSKA YATZY';
    });

angular.module('yatzy.utils', []);