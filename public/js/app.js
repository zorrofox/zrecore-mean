window.app = angular.module('MEAN', ['ngRoute', 'ngCookies', 'ngResource', 'ui.bootstrap']).filter('boolean', function () {
    return function (input) {
        var out = "";
        if(input){
           out = "是";
        }else{
            out = "否";
        }
        return out;
    }
});
