angular.module('yatzy', ['ngAnimate', 'yatzy.newGame', 'ngFx'])
    .controller('main', function($scope) {
        $scope.meta = {};
        $scope.meta.title = 'GRILLSKA YATZY';
    });