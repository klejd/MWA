angular.module("doctorSystem").factory("DoctorDataFactory", DoctorDataFactory)

function DoctorDataFactory($http) {
    return {
        getAllDoctors: getAllDoctors,
        getOneDoctor: getOneDoctor
    };

    function getAllDoctors() {
        return $http.get("/api/Doctor").then(complete).catch(failed);
    };

    function getOneDoctor(id) {
        return $http.get("/api/Doctor/" + id).then(complete).catch(failed);
    };

    function complete(response) {
        console.log(response.data);
        return response.data;
    };

    function failed(error) {
        return error.status.statusText;
    }
}