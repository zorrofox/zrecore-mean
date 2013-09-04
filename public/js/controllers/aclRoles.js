/**
 * Created with JetBrains WebStorm.
 * User: grhuang
 * Date: 13-9-2
 * Time: 上午11:27
 * To change this template use File | Settings | File Templates.
 */
function AclRoleController($scope, $routeParams, $location, Global, AclRoles) {
    $scope.global = Global;

    $scope.create = function () {
        var aclRole = new AclRoles({ role_name: this.role_name});
        aclRole.$save(function (response) {
            console.log(response);
            $location.path("AclRole/" + response.data._id);
        });

        this.role_name = "";
    };

    $scope.remove = function (aclRole) {
        aclRole.$remove();

        for (var i in $scope.aclRoles) {
            if ($scope.aclRoles[i] == aclRole) {
                $scope.aclRoles.splice(i, 1)
            }
        }
    };

    $scope.update = function () {
        var aclRole = $scope.aclRole;
        aclRole.timestamp_modified = new Date().getTime();

        aclRole.$update(function () {
            $location.path('AclRole/' + aclRole.data._id);
        });
    };

    $scope.find = function (query) {
        AclRoles.query(query, function (aclRoles) {

            $scope.aclRoles = aclRoles;
        });
    };

    $scope.findOne = function () {
        AclRoles.get({ aclRoleId: $routeParams.aclRoleId }, function (aclRole) {
            $scope.aclRole = aclRole;
        });
    };
}