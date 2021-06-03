angular.module("meanGames").controller("GameController", GameController);

function getstars(stars) {
    return new Array(stars);
}

function GameController($routeParams, AuthFactory, GameDataFactory, $route) {
    const vm = this;
    let gameId = $routeParams.id;
    GameDataFactory.getOneGame(gameId).then(function(response) {
        vm.game = response;
        vm.rating = getstars(vm.game.rate);
    });
    vm.isLoggedIn = function() {
        // return AuthFactory.auth.isLoggedIn(); // kjo esht ideja po sedi pse nk hapet
        if (AuthFactory.auth.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };
    vm.deletegame = function() {
        GameDataFactory.deleteOneGameIndex(gameId).then(function(response) {
            console.log("deleted");

            $route.reload();

        });
    }
}