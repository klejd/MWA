    angular.module("asgnm7", ['ngRoute']).config(callback);

    function callback($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "templates/main.html",
            controller: "MainController",
            controllerAs: "mainCtrl"
        }).when("/about", {
            templateUrl: "templates/about.html",
            controller: "AboutController",
            controllerAs: "aboutCtrl"
        }).otherwise({
            redirectTo: "/"
        });

    }