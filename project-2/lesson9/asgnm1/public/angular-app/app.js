angular.module("meanjobs", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        templateUrl: "angular-app/job-list/job-list.html",
        controller: "jobsController",
        controllerAs: "vm"
    }).when("/job/:id", {
        templateUrl: "angular-app/job-one/job-one.html",
        controller: "JobController",
        controllerAs: "vm"
    }).when("/search", {
        templateUrl: "angular-app/job-search/job-search.html",
        controller: "searchController",
        controllerAs: "vm"
    }).when("/job/:id/locations", {
        templateUrl: "angular-app/location-list/location.html",
        controller: "locationController",
        controllerAs: "vm"
    }).when("/job/:id/locations/:locationId", {
        templateUrl: "angular-app/location-list/location.html",
        controller: "locationController",
        controllerAs: "vm"
    }).when("/job/:id/skills/", {
        templateUrl: "angular-app/skills-list/skills.html",
        controller: "skillsController",
        controllerAs: "vm"
    }).when("/job/:id/skills/:skillId", {
        templateUrl: "angular-app/skills-list/skills.html",
        controller: "skillsController",
        controllerAs: "vm"
    })


}