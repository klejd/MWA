angular.module("meanGames").controller("GameController", GameController);

function getstars(stars) {
    return new Array(stars);
}

function GameController($routeParams, GameDataFactory, $route, authFactory) {
    const vm = this;
    let gameId = $routeParams.id;
    GameDataFactory.getOneGame(gameId).then(function(response) {
        vm.game = response;
        vm.rating = getstars(vm.game.rate);
    });
    vm.isLoggedIn = function() {
        return authFactory.auth.isLoggedIn;
    };
    vm.deletegame = function() {
        GameDataFactory.deleteOneGameIndex(gameId).then(function(response) {
            console.log("deleted");

            $route.reload();

        });
    }
}