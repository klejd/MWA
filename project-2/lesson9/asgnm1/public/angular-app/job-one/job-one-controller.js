angular.module("meanjobs").controller("JobController", JobController);

function getstars(stars) {
    return new Array(stars);
}

function JobController($routeParams, jobDataFactory, $route) {
    const vm = this;
    let jobId = $routeParams.id;

    jobDataFactory.getOnejob(jobId)
        .then(function(response) {
            vm.job = response;
            vm.titlee = vm.job.title;
            vm.salaryy = vm.job.salary;
            vm.descriptionn = vm.job.description;
            vm.experiencee = vm.job.experience;
            vm.PostDatee = vm.job.PostDate;
            vm.skills = vm.job.skills;
            console.log(vm.job._id);
        })
        .catch(function(error) {
            console.log(error);
        });
    // jobDataFactory.getOnejob(jobId).then(function(response) {
    //     vm.job = response;
    //     vm.rating = getstars(vm.job.rate);

    // });

    vm.fullupdate = function() {
        console.log(vm.salaryy);
        const editedJob = {
                title: vm.titlee,
                description: vm.descriptionn,
                experience: vm.experiencee,
                salary: vm.salaryy,
                PostDate: vm.PostDatee
            }
            // skills: vm.editedJobSkills, -> i did this sub-doc arr 
        jobDataFactory.FullUpdateOnejob(jobId, editedJob).then(function(response) {
            // console.log("updated" + updated);
            vm.status = response;
            // location.replace("/");
            $route.reload();
        })
    }
    vm.partialupdate = function() {
        console.log(vm.salaryy);
        const editedJob = {
                title: vm.titlee,
                description: vm.descriptionn,
                experience: vm.experiencee,
                salary: vm.salaryy,
                PostDate: vm.PostDatee
            }
            // skills: vm.editedJobSkills, -> i did this sub-doc arr 
        jobDataFactory.partialUpdate(jobId, editedJob).then(function(response) {
            // console.log("updated" + updated);
            vm.status = response;
            // location.replace("/");
            $route.reload();
        })
    }


    vm.deletejob = function() {

        jobDataFactory.deleteOnejobIndex(jobId).then(function(response) {
            console.log("deleted");

            $route.reload();

        }).catch((err) => {
            console.log(err);
        });
    }
}