angular.module("meannobels", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/nobel-list/nobel-list.html",
        controller: "nobelsController",
        controllerAs: "vm"
    }).when("/nobel/:id", {
        templateUrl: "angular-app/nobel-one/nobel-one.html",
        controller: "nobelController",
        controllerAs: "vm"
    }).when("/search", {
        templateUrl: "angular-app/nobel-search/nobel-search.html",
        controller: "searchController",
        controllerAs: "vm"
    })

}