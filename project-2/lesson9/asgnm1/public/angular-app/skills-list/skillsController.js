//  angular.module("meanjobs").controller("locationController", locationController);
angular.module("meanjobs").controller("skillsController", skillsController);

function skillsController($routeParams, skillDataFactory, $route) {
    const vm = this;
    let id = $routeParams.id;
    let skillId = $routeParams.skillId;

    skillDataFactory.getAllskills(id).then((response) => {
        vm.locations = response.location;
        vm.job = response;
        console.log("allData", response);
    }).catch((err) => {
        console.log(err);
    });
    // }
    vm.deleteOneskill = (id, skillId) => {
        skillDataFactory.deleteOneskill(id, skillId).then((response) => {
            console.log(response);
            $route.reload();
        }).catch((err) => {
            console.log(err);
        })
    }

    vm.addOneskill = (id) => {
        let savelocation = {
            country: vm.countryy,
            // state: vm.statee,
            city: vm.cityy,
            // street: vm.street,
            // zip: vm.zip
        }
        skillDataFactory.addOneskill(id, savelocation).then((response) => {
            console.log(response);
            $route.reload();
        }).catch((err) => {
            console.log(err);

        })
    }

    vm.partialUpdateskill = (id, skillId) => {
        let savelocation = {

            country: vm.countryyyy,
            // state: vm.statee,
            city: vm.cityyyy,
            // street: vm.street,
            // zip: vm.zip
        }
        skillDataFactory.partialUpdateskill(id, skillId, savelocation).then((response) => {
            console.log(response);
            $route.reload();
        }).catch((err) => {
            console.log(err);

        })
    }
    vm.FullUpdateOneskill = (id, skillId) => {
        let savelocation = {
            country: vm.countryyy,
            // state: vm.statee,
            city: vm.cityyy
                // street: vm.street,
                // zip: vm.zip
        }
        skillDataFactory.FullUpdateOneskill(id, skillId, savelocation).then((response) => {
            console.log(response);
            $route.reload();
        }).catch((err) => {
            console.log(err);

        })
    }
}

// function locationController($routeParams, skillDataFactory, $route) {
//     const vm = this;
//     // const id = $route.id;
//     // vm.deletelocation = (id) => {
//     //     skillDataFactory.deleteonelocation(id).then((response) => {
//     //         console.log("Deleted", response);
//     //     }).catch((err) => {
//     //         console.log(err);
//     //     });
//     // }

//     vm.displayall = () => {
//         skillDataFactory.getAllLocation().then((response) => {
//             vm.locations = response;
//             console.log("allData", response);
//         }).catch((err) => {
//             console.log(err);
//         });
//     }
// }