angular.module("meannobels").controller("searchController", searchController);

function searchController($routeParams, nobelDataFactory, $route) {
    const vm = this;
    vm.title = "Search for nobel";
    vm.count = 100;
    vm.offset = 0
    loadData = (count, offset) => {
        nobelDataFactory.getAllnobels(count, offset).then(function({ nobels, maxCount }) {
            vm.nobels = nobels;
            vm.maxCount = maxCount;
        });

    }
    loadData(vm.count, vm.offset);
}