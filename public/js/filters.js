window.app.filter('boolean', function () {
    return function (input) {
        var out = "";
        if (input) {
            out = "是";
        } else {
            out = "否";
        }
        return out;
    }
});

window.app.filter('filterEx', function () {
    return function (input, ex) {
        var out = [];
        for (c in input) {
            for (p in ex) {
                if (((input[c])[p] != ex[p] || ex[p] == undefined) && (c.indexOf("$") < 0 )) {
                    out.push(input[c]);
                }
            }
        }
        return out;
    }
});

window.app.filter('getAclResource', function ($resource) {
    return function (input) {
        var out = "";
        var res = $resource("AclResource/:AclResourceId", {AclResourceId:input});
        var rec = res.get(function(){
           return;
        });

        out = rec.resource_name;
        return out;

    }
});