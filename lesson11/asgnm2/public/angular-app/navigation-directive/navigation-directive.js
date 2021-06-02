angular.module("meanGames").directive("gamesNavigation", gamesNavigation);

function gamesNavigation() {
    return {
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    }
}