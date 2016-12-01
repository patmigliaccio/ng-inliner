'use strict';

function MainController(){
    this.values = ['Foo', 'Bar', 'Me'];
}

angular.module('ExampleApp', ['cssInliner'])
    .controller('MainCtrl', MainController);