angular.module("doctorSystem").factory("DoctorDataFactory", DoctorDataFactory)

function DoctorDataFactory($http) {
    return {
        getAllDoctors: getAllDoctors,
        getOneDoctor: getOneDoctor,
        deleteOneDoctor: deleteOneDoctor,
        addOneDoctor: addOneDoctor
    };

    function addOneDoctor(doc) {
        return $http.post("/api/Doctor", doc).then(complete).catch(failed);
    }

    function deleteOneDoctor(id) {
        return $http.delete("/api/Doctor/" + id).then(complete).catch(failed);
    }

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