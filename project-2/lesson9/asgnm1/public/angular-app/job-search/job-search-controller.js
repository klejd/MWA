angular.module("meanjobs").controller("searchController", searchController);

function searchController($routeParams, jobDataFactory, $route) {
    const vm = this;
    vm.title = "Search for job";
    vm.count = 4;
    vm.offset = 0
    loadData = (count, offset) => {
        jobDataFactory.getAlljobs(count, offset).then(function({ jobs, maxCount }) {
            vm.jobs = jobs;
            vm.maxCount = maxCount;
        });
    }
    loadData(vm.count, vm.offset);
}