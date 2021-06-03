angular.module("meanGames").controller("DoctorsController", DoctorsController);

function DoctorsController($routeParams, AuthFactory, DoctorDataFactory, $route) {
    const vm = this;
    vm.title = "Hospital App";
    // let doctorId = $routeParams.id
    DoctorDataFactory.getAllDoctors().then(function(response) {
        vm.Doctor = response;
    });
    vm.addDoctor = function() {
        let savedoc = {
            name: vm.newdoctorname,
            speciality: vm.newdoctorspeciality
        }
        DoctorDataFactory.addOneDoctor(savedoc).then(() => {
            console.log("saved");
            $route.reload();
        }).catch((error) => {
            console.log("error" + error);

        })
    }
    vm.deleteDoctor = function(id) {
        DoctorDataFactory.deleteOneDoctor(id).then(() => {
            console.log("deleted");
            $route.reload();
        }).catch(() => {
            console.log(error);
        })

    }
    vm.isLoggedIn = function() {
        // return AuthFactory.auth.isLoggedIn(); // kjo esht ideja po sedi pse nk hapet
        if (AuthFactory.auth.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };
}