window.app.directive('aclResource', function (AclResource) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.aclResource, function (value) {
            if (value) {
                AclResource.get({AclResourceId: value}, function (rec) {
                    element.text(rec.resource_name);
                });
            }
        });
    };
});

window.app.directive('menu', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            loc: '@location',
            menus: '='
        },
        link: function($scope, $element) {

        },
        templateUrl : "template/menus/menus.html"
    };
})