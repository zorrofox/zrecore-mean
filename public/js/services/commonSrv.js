/**
 * Created with JetBrains WebStorm.
 * User: grhuang
 * Date: 13-9-3
 * Time: 下午2:02
 * To change this template use File | Settings | File Templates.
 */

commonDataSrv('AclResource');
commonDataSrv('AclRole');


function commonDataSrv(dataSchema) {

    return window.app.factory(dataSchema, function ($resource) {

        var actions = {
            update: {method: 'PUT'},
            query: {isArray: true, method: 'GET', transformResponse: transf},
            get: {method: 'GET', transformResponse: transf, isArray: false}
        };

        function transf(data) {
            return angular.fromJson(data).data;
        };
        var params = {};
        params[dataSchema + "Id"] = "@_id";
        return $resource(dataSchema + "/:" + dataSchema + "Id", params, actions);
    });

}