function HeaderController($scope, $location, Global, AclResource) {
    $scope.global = Global;

    $scope.menus = {};

    AclResource.query({}, function (data) {
            var menu = data.data;
            var newMenu = [];
            var childMenu = [];
            for (var c in menu) {
                if (menu[c]._hasChildren)
                    for (var a in menu[c].children_resource)
                        childMenu.push(menu[c].children_resource[a]);
            }

            for (var c in menu) {
                if ($.inArray(menu[c]._id, childMenu) < 0 && menu[c]._hasChildren) {
                    var item = {resource_id: menu[c]._id, resource_name: menu[c].resource_name, has_child: true, children_resource: menu[c].children_resource, children: []};
                    newMenu.push(item);
                }
            }

            for (var c in newMenu) {
                loopMenu(newMenu[c]);
            }

            function loopMenu(father) {
                for (var p in father.children_resource) {
                    for (var c in menu) {
                        if (father.children_resource[p] == menu[c]._id) {
                            var item = {resource_id: menu[c]._id, resource_name: menu[c].resource_name, has_child: true, children_resource: menu[c].children_resource, children: [], resource_url: menu[c].resource_url};
                            father.children.push(item);
                            if (menu[c]._hasChildren) loopMenu(item);
                        }
                    }
                }
            }

            $scope.menus.data = newMenu;
            console.log(newMenu);
        }
    );

    $scope.init = function () {
    };
}