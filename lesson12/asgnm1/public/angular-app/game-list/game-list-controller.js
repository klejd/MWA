angular.module("meanGames").controller("GamesController", GamesController);

function GamesController($routeParams, GameDataFactory, $route) {
    const vm = this;
    vm.title = "Mean Games App";
    let gameId = $routeParams.id;
    // vm.isSubmitted=false;
    GameDataFactory.getAllGames().then(function(response) {
        vm.games = response;
    });
    // reminder --> "pass the id"
    vm.deletegamee = function(id) {
        GameDataFactory.deleteOneGameIndex(id).then(function(response) {
            console.log("deleted");

            $route.reload();

        });
    }
    vm.addGame = function() {
        console.log("adding........");
        let savethis = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            rate: vm.newGameRating,
            year: vm.newGameYear,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge,
            designers: vm.newGameDesigner
        };
        console.log("here ...")
        if (vm.gameForm.$valid) {
            console.log("inside valid");
            GameDataFactory.addOneGame(savethis).then(function(response) {
                console.log("Game saved");
                $route.reload();
                // return response.data;
            }).catch(function(error) {
                console.log(error);
            });
        }
        // else{
        //     vm.isSubmitted=true;
        // }
    }


}