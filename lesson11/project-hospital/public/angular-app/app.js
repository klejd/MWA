// angular.module("doctorSystem", ["ngRoute"]).config(config);

// function config($routeProvider, $locationProvider) {
//     $locationProvider.hashPrefix("");
//     $routeProvider.when("/", {
//         templateUrl: "angular-app/doctor-list/doctor-list.html",
//         controller: "DoctorsController",
//         controllerAs: "vm"
//     }).when("/Doctor/:id", {
//         templateUrl: "angular-app/doctor-one/doctor-one.html",
//         controller: "GameController",
//         controllerAs: "vm"
//     });
// }
angular.module("meanGames", ['ngRoute', "angular-jwt"]).config(config).run(run);

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
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",

        access: { restricted: true }
    }).otherwise({
        redirectTo: "/"
    })


}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        //This is to enable overcomming restricted URLs
        if (nextRoute.access !== undefined && nextRoute.access.restricted &&
            !$window.localStorage.token && !AuthFactory.auth.isLoggedIn) {
            event.preventDefault();
            $location.path("/");


        }
    });
}