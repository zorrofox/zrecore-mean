window.app.directive('aclResource', function ($resource) {
    return function (scope, element, attrs) {
        var out = {};
        var res = $resource('AclResource/:Id',{Id: '@_id'});
       var resId = "";//scope.AclResource.father_resource;
        scope.aa = "dddddddddddddd";
        console.log(scope.$eval(element.attr("data-acl-resource")))
        console.log();
        res.get({Id:resId},function (rec) {
            //element.text("BBBB");
            //console.log(rec);
        });

    };
});