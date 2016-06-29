angular.module('ExampleApp', ['ngInliner'])
    .controller('MainCtrl', ['$scope', function($scope){
        $scope.values = ['Foo', 'Bar', 'Me'];
    }]);