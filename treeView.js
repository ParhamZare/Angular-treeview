/**
 * in the name of allah
 * Created by ParhamZare on 2/22/2016.
 * email:parhamzare1@gmail.com
 */
angular.module('treeView', []).directive('treeView', function (myService, myServicePost) {
    return {
        template: '<div ><script type="text/ng-template" id="field_renderer.html1"> <label  ng-class="{\'hasChild\':field.children.length>0}" for=""> <span ng-click="addExpended(field.id)" ng-show="field.children.length>0">> </span> <input type="checkbox" ng-model="selectedItems[field.id]">{{field.name}} </label> <ul ng-if="field.children" ng-init="parentId=field.id"> <li id="{{parentId}}" ng-show="isExpend({{parentId}})" style="list-style-type: circle" ng-repeat="field in field.children" ng-include="\'field_renderer.html1\'"> </li> </ul> </script> <ul style="list-style-type: circle"> <li  style="list-style-type: circle"ng-repeat="field in lstItems"ng-include="\'field_renderer.html1\'"> </li> </ul> </div>',
        restrict: 'AE',
        replace: true,
        scope: {
            data: '@',
            fetchUrl: '@',
            fetchType: '@',
            mySelection: '=',
            ngModel: "="
        },
        link: function (scope, elm, attr) {
            scope.lstItems = [];
            if (scope.data != undefined) {
                scope.lstItems = JSON.parse(scope.data);
                scope.loaded = 1;
            }
            else {
                console.log(scope.fetchType);
                switch (scope.fetchType) {
                    case 'get':
                        var myDataPromise = myService.getData(scope.fetchUrl);
                        myDataPromise.then(function (result) {
                            scope.lstItems = result;
                            scope.loaded = 1;
                        });
                        break;
                    case 'post':
                        var myDataPromise = myServicePost.postData(scope.fetchUrl);
                        myDataPromise.then(function (result) {
                            scope.lstItems = result;
                            scope.loaded = 1;
                        });
                        break;
                }
            }
        },
        controller: function ($scope) {
            $scope.selectedItems = {};
            $scope.seledctedCategories2 = [];
            $scope.loaded = 0;
            $scope.$watch('loaded', function (e) {
                if ($scope.loaded == 1) {
                    $scope.findAndSet();
                }
            })
            $scope.$watchCollection('selectedItems', function (e) {
                $scope.findAndSet();
            })
            $scope.findAndSet = function () {
                $scope.seledctedCategories2 = [];
                for (var key in $scope.selectedItems) {
                    if ($scope.selectedItems[key]) {
                        searchInNested($scope.lstItems, key)
                    }
                }
                $scope.ngModel = $scope.seledctedCategories2;
            }
            if (typeof($scope.mySelection) === 'object') {
                $scope.mySelection.forEach(function (entry) {
                    $scope.selectedItems[entry.id] = true;
                })
            }
            function searchInNested(array, need) {
                array.forEach(function (entry) {
                    if (parseInt(entry.id) == parseInt(need)) {
                        $scope.seledctedCategories2.push(entry);
                    }
                    else if (entry.children.length > 0) {
                        searchInNested(entry.children, parseInt(need))
                    }
                })
            }

            $scope.lstExpended = [];
            $scope.isExpend = function (idParent) {
                var isAllow = false;
                $scope.lstExpended.forEach(function (entry) {
                    if (parseInt(entry) == idParent) {
                        isAllow = true;
                    }
                })
                return isAllow;
            }
            $scope.addExpended = function (id) {
                if ($scope.lstExpended.length == 0) {
                    $scope.lstExpended.push(parseInt(id));
                }
                else {
                    var hasDuplicate = 0;
                    $scope.lstExpended.forEach(function (entry, index) {
                        if (parseInt(entry) == parseInt(id)) {
                            $scope.lstExpended.splice(index, 1);
                            hasDuplicate++;
                        }
                    })
                    if (hasDuplicate == 0) {
                        $scope.lstExpended.push(parseInt(id));
                    }
                }
            }
        }
    }
});
myApp.factory('myService', function ($http) {
    var getData = function (urlResource) {
        return $http({method: "GET", url: urlResource}).then(function (result) {
            return result.data;
        });
    };
    return {getData: getData};

});
myApp.factory('myServicePost', function ($http) {

    var postData = function (url, data) {
        return $http({method: "POST", url: url, data: data})
            .error(function (err) {
                console.log(err);
            }).then(function (result) {
                return result.data;
            })
    };
    return {postData: postData};
});