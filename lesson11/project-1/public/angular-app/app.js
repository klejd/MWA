angular.module("doctorSystem", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/doctor-list/doctor-list.html",
        controller: "DoctorsController",
        controllerAs: "vm"
    }).when("/Doctor/:id", {
        templateUrl: "angular-app/doctor-one/doctor-one.html",
        controller: "GameController",
        controllerAs: "vm"
    });
}