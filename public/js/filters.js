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
                if (((input[c]._id) != ex || ex == undefined) && (c.indexOf("$") < 0 )) {
                    out.push(input[c]);
            }
        }
        console.log(ex);
        return out;
    }
});

