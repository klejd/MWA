angular.module("meannobels").controller("nobelController", nobelController);

function getstars(stars) {
    return new Array(stars);
}

function nobelController($routeParams, nobelDataFactory, $route) {
    const vm = this;
    let nobelId = $routeParams.id;
    nobelDataFactory.getOnenobel(nobelId)
        .then(function(response) {
            vm.nobel = response;
            vm.firstname = vm.firstnamee;
            vm.year = vm.yearr;
            vm.gender = vm.genderr;
            vm.category = vm.categoryy;
            vm.affiliation = vm.affiliationn;
            vm.bornCountry = vm.bornCountryy;
            // console.log(vm.nobel._id);
        })
        .catch(function(error) {
            console.log(error);
        });

    vm.fullupdate = function() {
        // console.log(vm.salaryy);
        const editednobel = {
            firstname: vm.firstname,
            year: vm.year,
            gender: vm.gender,
            category: vm.category,
            affiliation: vm.affiliation,
            bornCountry: vm.bornCountry
        }

        nobelDataFactory.FullUpdateOnenobel(nobelId, editednobel).then(function(response) {

            vm.status = response;
            // location.replace("/");
            $route.reload();
        })
    }


    vm.deletenobel = function() {

        nobelDataFactory.deleteOnenobelIndex(nobelId).then(function(response) {
            console.log("deleted");

            $route.reload();

        }).catch((err) => {
            console.log(err);
        });
    }
}