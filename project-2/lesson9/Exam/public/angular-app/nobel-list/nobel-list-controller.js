angular.module("meannobels").controller("nobelsController", nobelsController);

function nobelsController($routeParams, nobelDataFactory, $route) {
    const vm = this;
    vm.count = 5;
    vm.offset = 0;
    vm.title = "Search for Nobel";
    // let nobelId = $routeParams.id;
    // vm.isSubmitted=false;
    loadData = (count, offset) => {
        nobelDataFactory.getAllnobels(count, offset).then(function({ nobels, maxCount }) {
            vm.nobels = nobels;
            vm.maxCount = maxCount;
        });

    }
    loadData(vm.count, vm.offset);

    // reminder --> "pass the id"
    vm.deletenobele = function(id) {
        nobelDataFactory.deleteOnenobelIndex(id).then(function(response) {
            console.log("deleted");

            $route.reload();

        });
    }
    vm.nextPage = (type) => {
        //if type is next we go next otherwise we go back 
        vm.offset = (type == "next") ? vm.offset + vm.count : vm.offset - vm.count;
        console.log(vm.offset);
        // nobelDataFactory.getAllnobels(vm.count, vm.offset).then(({ nobels, maxCount }) => vm.nobels = nobels)
        loadData(vm.count, vm.offset);
    }
    vm.addnobel = function() {
        console.log("adding........");
        let savethis = {
            firstname: vm.firstnamee,
            year: vm.yearr,
            gender: vm.genderr,
            category: vm.categoryy,
            affiliation: vm.affiliationn,
            bornCountry: vm.bornCountryy
        };
        console.log("here ...")
        if (vm.nobelForm.$valid) {
            console.log("inside valid");
            nobelDataFactory.addOnenobel(savethis).then(function(response) {
                console.log("nobel saved");
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