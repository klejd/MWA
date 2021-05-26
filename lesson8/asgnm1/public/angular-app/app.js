angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/game-list/game-list.html",
        controller: "GamesController",
        controllerAs: "vm"
    }).when("/game/:id", {
        templateUrl: "angular-app/game-one/game-one.html",
        controller: "GameController",
        controllerAs: "vm"
    });
}