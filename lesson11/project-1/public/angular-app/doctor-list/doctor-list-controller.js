angular.module("doctorSystem").controller("DoctorsController", DoctorsController);

function DoctorsController(DoctorDataFactory) {
    const vm = this;
    vm.title = "Hospital App";
    DoctorDataFactory.getAllDoctors().then(function(response) {
        vm.Doctor = response;
    });
}