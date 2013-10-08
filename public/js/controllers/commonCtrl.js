/**
 * Created with JetBrains WebStorm.
 * User: greg
 * Date: 13-9-13
 * Time: 上午11:52
 * To change this template use File | Settings | File Templates.
 */

commonControl("AclResourceController", "AclResource");
commonControl("AclRoleController", "AclRole");
commonControl("AclPermissionController", "AclPermission");
commonControl("UserController", "User");

function commonControl(controller, dataSchema) {

    return window.app.controller(controller, ["$scope", "$routeParams", "$location", "Global", dataSchema, function ($scope, $routeParams, $location, Global, dataObj) {

        $scope.global = Global;

        $scope.alerts = [];

        $scope.create = function () {
            if (!Global.authenticated) {
                $location.url("/");
                return;
            }
            var obj = {};

            for (var p in this) {
                if ((angular.isArray(this[p]) || typeof(this[p]) == "string" || typeof(this[p]) == "number" || typeof(this[p]) == "boolean" || typeof(this[p]) == "undefined") && p.substr(0, 1) != "$")
                    obj[p] = this[p];
            }
            var rec = new dataObj(obj);
            rec.$save(function (response) {

                if (response.result == "ok") {
                    $scope.alerts = [];
                    $location.path(dataSchema + "/" + response.data._id);

                } else {
                    $scope.alerts.push({type: 'danger', msg: "创建失败，错误信息为：" + response.message});
                }
            });

            if (this.alerts.length <= 0) {
                for (var p in this) {
                    if ((typeof(this[p]) == "string" || typeof(this[p]) == "number" || typeof(this[p]) == "boolean" || typeof(this[p]) == "undefined") && p.substr(0, 1) != "$")
                        this[p] = "";
                    if (angular.isArray(this[p]) && p.substr(0, 1) != "$") {
                        this[p] = [];
                    }
                }
            }
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.find = function (query) {
            dataObj.query(query, function (data) {
                $scope[dataSchema] = data.data;
                $scope.totalItems = data.pagination.count;
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
            query[dataSchema + "Id"] =queryId;
            dataObj.get(query, function (rec) {
                $scope[dataSchema + "One"] = rec;
            });

        };

        $scope.remove = function (data) {
            if (!Global.authenticated) {
                $location.url("/");
                return;
            }
            var query = {};
            query[dataSchema + "Id"] = data._id;

            dataObj.get(query, function (rec) {
                rec.$remove();
            });


            for (var i in $scope[dataSchema]) {
                if ($scope[dataSchema][i] == data) {
                    $scope[dataSchema].splice(i, 1);
                }
            }
        };

        $scope.update = function () {
            if (!Global.authenticated) {
                $location.url("/");
                return;
            }
            var orig = {};
            var rec = $scope[dataSchema];
            angular.copy(rec, orig);
            console.log(orig);
            rec.timestamp_modified = new Date().getTime();
            rec.$update(function () {
                if (rec.result == "ok" || rec._id) {
                    $scope.alerts = [];
                    console.log(rec);
                    $location.path(dataSchema + "/" + ((rec._id) ? rec._id : rec.data._id));
                } else {
                    $scope.alerts.push({type: 'danger', msg: "更新失败，错误信息为：" + rec.message});
                    $scope[dataSchema] = orig;
                }


            });
        };

    }]);


}
