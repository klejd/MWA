angular.module("doctorSystem").controller("DoctorsController", DoctorsController);

function DoctorsController($routeParams, DoctorDataFactory, $route) {
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
}