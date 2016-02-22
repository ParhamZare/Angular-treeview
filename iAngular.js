/**
 * in the name of allah
 * Created by ParhamZare on 2/22/2016.
 * email:parhamzare1@gmail.com
 */
var myApp = angular.module('myApp', ['treeView'], function ($interpolateProvider) {

});
angular.module('myApp').config(['$controllerProvider', function ($controllerProvider) {
    $controllerProvider.allowGlobals();
}]);
function treeViewController($scope, $http) {
    $scope.data = [{
        "id": 155,
        "name": "Item1",
        "children": [{
            "id": 156,
            "name": "Item 1-1",
            "children": [{
                "id": 157,
                "name": "Item 1-1-1",
                "children": [{"id": 159, "name": "Item 1-1-1-1", "children": []}]
            }]
        }]
    }, {"id": 158, "name": "Item2", "children": []}, {
        "id": 160,
        "name": "Item3",
        "children": []
    }, {"id": 171, "name": "Item3", "children": []}, {"id": 172, "name": "Item4", "children": []}, {
        "id": 173,
        "name": "Item5",
        "children": []
    }, {"id": 174, "name": "Item6", "children": []}];
}