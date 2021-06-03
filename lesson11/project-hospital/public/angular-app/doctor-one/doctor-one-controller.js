angular.module("meanGames").controller("GameController", GameController);

function GameController($routeParams, AuthFactory, DoctorDataFactory) {
    const vm = this;
    let doctorId = $routeParams.id;
    DoctorDataFactory.getOneDoctor(doctorId).then(function(response) {
        vm.Doctor = response;
    });
    vm.isLoggedIn = function() {
        // return AuthFactory.auth.isLoggedIn(); // kjo esht ideja po sedi pse nk hapet
        if (AuthFactory.auth.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };
}