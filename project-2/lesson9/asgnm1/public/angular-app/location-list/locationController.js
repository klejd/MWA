//  angular.module("meanjobs").controller("locationController", locationController);
angular.module("meanjobs").controller("locationController", locationController);

function locationController($routeParams, locationDataFactory, $route) {
    const vm = this;
    let id = $routeParams.id; //jobid
    let locationId = $routeParams.locationId;
    console.log(id);
    //jobid
    // jobDataFactory.getOnejob(id)
    //     .then(function(response) {
    //         vm.job = response;
    //         vm.location = response.location;
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     });

    // vm.displayall = (id) => {
    locationDataFactory.getAllLocation(id).then((response) => { //get all the location about this job
        vm.locations = response.location;
        vm.job = response;
        console.log("allData", response);
    }).catch((err) => {
        console.log(err);
    });
    // }
    vm.deleteOnelocation = (id, locationId) => {
        locationDataFactory.deleteOnelocation(id, locationId).then((response) => {
            console.log(response);
            $route.reload();
        }).catch((err) => {
            console.log(err);
        })
    }

    vm.addonelocation = (id) => {
        let savelocation = {
            country: vm.countryy,
            // state: vm.statee,
            city: vm.cityy,
            // street: vm.street,
            // zip: vm.zip
        }
        locationDataFactory.addOnelocation(id, savelocation).then((response) => {
            console.log(response);
            $route.reload();
        }).catch((err) => {
            console.log(err);

        })
    }

    vm.partialonelocation = (id, locationId) => {
        let savelocation = {

            country: vm.countryyyy,
            // state: vm.statee,
            city: vm.cityyyy,
            // street: vm.street,
            // zip: vm.zip
        }
        locationDataFactory.partialUpdatelocation(id, locationId, savelocation).then((response) => {
            console.log(response);
            $route.reload();
        }).catch((err) => {
            console.log(err);

        })
    }
    vm.fullupdate = (id, locationId) => {
        let savelocation = {
            country: vm.countryyy,
            // state: vm.statee,
            city: vm.cityyy
                // street: vm.street,
                // zip: vm.zip
        }
        locationDataFactory.FullUpdateOnelocation(id, locationId, savelocation).then((response) => {
            console.log(response);
            $route.reload();
        }).catch((err) => {
            console.log(err);

        })
    }
}

// function locationController($routeParams, locationDataFactory, $route) {
//     const vm = this;
//     // const id = $route.id;
//     // vm.deletelocation = (id) => {
//     //     locationDataFactory.deleteonelocation(id).then((response) => {
//     //         console.log("Deleted", response);
//     //     }).catch((err) => {
//     //         console.log(err);
//     //     });
//     // }

//     vm.displayall = () => {
//         locationDataFactory.getAllLocation().then((response) => {
//             vm.locations = response;
//             console.log("allData", response);
//         }).catch((err) => {
//             console.log(err);
//         });
//     }
// }