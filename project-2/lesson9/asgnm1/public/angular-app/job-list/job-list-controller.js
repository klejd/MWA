angular.module("meanjobs").controller("jobsController", jobsController);

function jobsController($routeParams, jobDataFactory, $route) {
    const vm = this;
    vm.count = 2;
    vm.offset = 0;
    vm.title = "Search for Job";
    // let jobId = $routeParams.id;
    // vm.isSubmitted=false;
    loadData = (count, offset) => {
        jobDataFactory.getAlljobs(count, offset).then(function({ jobs, maxCount }) {
            vm.jobs = jobs;
            vm.maxCount = maxCount;
        });

    }
    loadData(vm.count, vm.offset);

    // reminder --> "pass the id"
    vm.deletejobe = function(id) {
        jobDataFactory.deleteOnejobIndex(id).then(function(response) {
            console.log("deleted");

            $route.reload();

        });
    }
    vm.nextPage = (type) => {
        //if type is next we go next otherwise we go back 
        vm.offset = (type == "next") ? vm.offset + vm.count : vm.offset - vm.count;
        console.log(vm.offset);
        // jobDataFactory.getAlljobs(vm.count, vm.offset).then(({ jobs, maxCount }) => vm.jobs = jobs)
        loadData(vm.count, vm.offset);
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