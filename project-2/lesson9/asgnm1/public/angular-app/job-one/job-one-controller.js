angular.module("meanjobs").controller("JobController", JobController);

function getstars(stars) {
    return new Array(stars);
}

function JobController($routeParams, jobDataFactory, $route) {
    const vm = this;
    let jobId = $routeParams.id;
    jobDataFactory.getOnejob(jobId).then(function(response) {
        vm.job = response;
        vm.rating = getstars(vm.job.rate);
    });
    vm.deletejob = function() {
        jobDataFactory.deleteOnejobIndex(jobId).then(function(response) {
            console.log("deleted");

            $route.reload();

        });
    }
}