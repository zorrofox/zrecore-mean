/**
 * Created with JetBrains WebStorm.
 * User: grhuang
 * Date: 13-9-3
 * Time: 下午2:17
 * To change this template use File | Settings | File Templates.
 */

function AclResourceController($scope, $routeParams, $location, Global, AclResources) {
    $scope.global = Global;

    $scope.create = function () {
        var rec = new AclResources({ resource_name: this.resource_name, resource_url: this.resource_url});

        rec.$save(function (response) {
            console.log(response);
            $location.path("AclResource/" + response.data._id);
        });

        this.resource_name = "";
        this.resource_url = "";
    };

    $scope.remove = function (data) {
        data.$remove();

        for (var i in $scope.aclResources) {
            if ($scope.aclResources[i] == aclRole) {
                $scope.aclResources.splice(i, 1)
            }
        }
    };

    $scope.update = function () {
        var rec = $scope.aclResource;
        rec.timestamp_modified = new Date().getTime();

        rec.$update(function () {
            $location.path('AclResource/' + rec.data._id);
        });
    };

    $scope.find = function (query) {
        AclResources.query(query, function (data) {
            $scope.AclResources = data;
        });
    };

    $scope.findOne = function () {
        AclResources.get({ AclResourcesId: $routeParams.AclResourcesId }, function (rec) {
            $scope.AclResource = rec;
        });
    };
}