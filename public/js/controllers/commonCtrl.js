/**
 * Created with JetBrains WebStorm.
 * User: greg
 * Date: 13-9-13
 * Time: 上午11:52
 * To change this template use File | Settings | File Templates.
 */

commonControl("AclResourceController", "AclResource");
commonControl("AclRoleController", "AclRole");
commonControl("AclResListController", "AclResource")

function commonControl(controller, dataSchema) {

    return window.app.controller(controller, ["$scope", "$routeParams", "$location", "Global", dataSchema, function ($scope, $routeParams, $location, Global, dataObj) {

        $scope.global = Global;

        $scope.create = function () {
            if (!Global.authenticated) {
                $location.url("/");
                return;
            }
            var obj = {};

            for (p in this) {
                if ((angular.isArray(this[p]) || typeof(this[p]) == "string" || typeof(this[p]) == "number" || typeof(this[p]) == "boolean" || typeof(this[p]) == "undefined") && p.substr(0, 1) != "$")
                    obj[p] = this[p];
            }
            var rec = new dataObj(obj);

            rec.$save(function (response) {
                $location.path(dataSchema + "/" + response.data._id);
            });

            for (p in this) {
                if ((typeof(this[p]) == "string" || typeof(this[p]) == "number" || typeof(this[p]) == "boolean" || typeof(this[p]) == "undefined") && p.substr(0, 1) != "$")
                    this[p] = "";
                if (angular.isArray(this[p]))
                    this[p] = [];
            }
        };

        $scope.find = function (query) {
            dataObj.query(query, function (data) {
                $scope[dataSchema] = data;
            });
        };

        $scope.findList = function (query) {
            dataObj.query(query, function (data) {
                $scope[dataSchema + "List"] = data;
            });
        };

        $scope.findOne = function () {
            var query = {};
            query[dataSchema + "Id"] = $routeParams[dataSchema + "Id"];

            dataObj.get(query, function (rec) {
                $scope[dataSchema] = rec;
            });
        };


        $scope.findOneBy = function (queryId) {
            var query = {};
            if (queryId) {
                query[dataSchema + "Id"] = queryId;
            } else {
                return;
            }

            dataObj.get(query, function (rec) {
                $scope[dataSchema + "One"] = rec;
            });
        };

        $scope.remove = function (data) {
            if (!Global.authenticated) {
                $location.url("/");
                return;
            }
            data.$remove();

            for (var i in $scope[dataSchema]) {
                if ($scope[dataSchema][i] == aclRole) {
                    $scope[dataSchema].splice(i, 1)
                }
            }
        };

        $scope.update = function () {
            if (!Global.authenticated) {
                $location.url("/");
                return;
            }
            var rec = $scope[dataSchema];
            rec.timestamp_modified = new Date().getTime();
            rec.$update(function () {
                $location.path(dataSchema + '/' + rec.data._id);
            });
        };


        $scope.inList = function (val, arrObj) {
            var arr = [];

                for (c in arrObj) {
                    arr.push(arrObj[c]._id);
                }
                return $.inArray(val, arr);


        }


    }]);


}
