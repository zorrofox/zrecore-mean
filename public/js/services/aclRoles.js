/**
 * Created with JetBrains WebStorm.
 * User: grhuang
 * Date: 13-9-2
 * Time: 上午11:28
 * To change this template use File | Settings | File Templates.
 */
window.app.factory("AclRoles", function ($resource) {

    var actions = {
        update: {method: 'PUT'},
        query: {isArray: true, method: 'GET', transformResponse: transf},
        get: {method: 'GET', transformResponse: transf, isArray: false}
    };

    function transf(data) {
        return angular.fromJson(data).data;
    };
    return $resource("AclRole/:aclRoleId", {aclRoleId: '@_id'}, actions);
});