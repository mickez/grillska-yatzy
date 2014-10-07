angular.module('yatzy', ['ngAnimate', 'yatzy.newGame'])
    .controller('main', function($scope) {
        $scope.meta = {};
        $scope.meta.title = 'GRILLSKA YATZY';
    });