angular.module("meanjobs").directive("jobRating", jobRating);

function jobRating() {
    return {
        restrict: "E",
        templateUrl: "angular-app/job-rating-directive/rating.html",
        bindToController: true,
        controller: "JobController",
        controllerAs: "vm",
        scope: {
            stars: "@"
        }
    }
}