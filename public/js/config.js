//Setting up route
window.app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/articles', { templateUrl: 'views/articles/list.html' }).
        when('/articles/create', { templateUrl: 'views/articles/create.html' }).
        when('/articles/:articleId/edit', { templateUrl: 'views/articles/edit.html' }).
        when('/articles/:articleId', { templateUrl: 'views/articles/view.html' }).
        when('/', { templateUrl: 'views/index.html' }).
        when('/AclRole',{templateUrl:'views/AclRole/list.html'}).
        when('/AclRole/create', { templateUrl: 'views/AclRole/create.html' }).
        when('/AclRole/:aclRoleId/edit', { templateUrl: 'views/AclRole/edit.html' }).
        when('/AclRole/:aclRoleId', { templateUrl: 'views/AclRole/view.html' }).
        when('/AclResource',{templateUrl:'views/AclResource/list.html'}).
        when('/AclResource/create', { templateUrl: 'views/AclResource/create.html' }).
        when('/AclResource/:AclResourcesId/edit', { templateUrl: 'views/AclResource/edit.html' }).
        when('/AclResource/:AclResourcesId', { templateUrl: 'views/AclResource/view.html' }).
        otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function ($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function ($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);