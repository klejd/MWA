angular.module("meanjobs").controller("jobsController", jobsController);

function jobsController($routeParams, jobDataFactory, $route) {
    const vm = this;
    vm.title = "Search for Job";
    let jobId = $routeParams.id;
    // vm.isSubmitted=false;
    jobDataFactory.getAlljobs().then(function(response) {
        vm.jobs = response;
    });
    // reminder --> "pass the id"
    vm.deletejobe = function(id) {
        jobDataFactory.deleteOnejobIndex(id).then(function(response) {
            console.log("deleted");

            $route.reload();

        });
    }
    vm.addjob = function() {
        console.log("adding........");
        let savethis = {
            title: vm.newjobTitle,
            salary: vm.newjobsalary,
            description: vm.newjobdescription,
            experience: vm.newjobdexperience,
            PostDate: vm.newPostDatee,

        };
        console.log("here ...")
        if (vm.jobForm.$valid) {
            console.log("inside valid");
            jobDataFactory.addOnejob(savethis).then(function(response) {
                console.log("job saved");
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