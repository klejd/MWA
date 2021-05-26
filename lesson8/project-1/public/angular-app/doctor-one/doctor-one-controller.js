angular.module("doctorSystem").controller("GameController", GameController);

function GameController($routeParams, DoctorDataFactory) {
    const vm = this;
    let doctorId = $routeParams.id;
    DoctorDataFactory.getOneDoctor(doctorId).then(function(response) {
        vm.Doctor = response;
    });
}