/**
 * Created with JetBrains WebStorm.
 * User: greg
 * Date: 13-9-13
 * Time: 上午11:52
 * To change this template use File | Settings | File Templates.
 */

/*var nowHash = document.location.hash;
 if (nowHash.substr(0,2) =="#!") {
 console.log(nowHash.substring(3));
 commonControl(nowHash.substring(3));
 }*/

commonControl("AclResource");
commonControl("AclRole");

function commonControl(dataSchema) {


    return window.app.controller(dataSchema + "Controller", ["$scope", "$routeParams", "$location", "Global", dataSchema, function ($scope, $routeParams, $location, Global, dataObj) {

        $scope.global = Global;

        $scope.create = function () {
            if(!Global.authenticated){
                $location.url("/");
                return;
            }
            var obj = {};
            for (p in this) {
                if ((typeof(this[p]) == "string" || typeof(this[p]) == "number" || typeof(this[p]) == "boolean" || typeof(this[p]) == "undefined") && p.substr(0, 1) != "$")
                    obj[p] = this[p];
            }
            var rec = new dataObj(obj);

            console.log(this);

            rec.$save(function (response) {
                $location.path(dataSchema + "/" + response.data._id);
            });

            for (p in this) {
                if ((typeof(this[p]) == "string" || typeof(this[p]) == "number" || typeof(this[p]) == "boolean" || typeof(this[p]) == "undefined") && p.substr(0, 1) != "$")
                    this[p] = "";
            }
        };

        $scope.find = function (query) {
            dataObj.query(query, function (data) {
                $scope[dataSchema] = data;
            });
        };

        $scope.findOne = function () {
            var query = {};
            query[dataSchema + "Id"] = $routeParams[dataSchema + "Id"]
            dataObj.get(query, function (rec) {
                $scope[dataSchema] = rec;
            });
        };

        $scope.remove = function (data) {
            if(!Global.authenticated){
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
            if(!Global.authenticated){
                $location.url("/");
                return;
            }
            var rec = $scope[dataSchema];
            rec.timestamp_modified = new Date().getTime();

            rec.$update(function () {
                $location.path(dataSchema + '/' + rec.data._id);
            });
        };

    }]);


}
