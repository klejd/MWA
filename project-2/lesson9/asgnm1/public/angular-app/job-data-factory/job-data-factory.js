angular.module("meanjobs").factory("jobDataFactory", jobDataFactory)

function jobDataFactory($http) {
    return {
        getAlljobs: getAlljobs,
        getOnejob: getOnejob,
        addOnejob: addOnejob,
        deleteOnejob: deleteOnejob,
        deleteOnejobIndex: deleteOnejobIndex,
        FullUpdateOnejob: FullUpdateOnejob,
        partialUpdate: partialUpdate
    };

    function deleteOnejobIndex(id) {
        return $http.delete("/api/jobs/" + id).then(complete).catch(failed);
    }

    function deleteOnejob(id) {
        return $http.delete("/api/jobs/" + id).then(complete).catch(failed);
    }

    function FullUpdateOnejob(id, job) {
        return $http.put("/api/jobs/" + id, job)
            .then(complete).catch(failed);
    }

    function partialUpdate(id, job) {
        return $http.patch("/api/jobs/" + id, job)
            .then(complete).catch(failed);
    }

    function addOnejob(job) {
        return $http.post("/api/jobs/", job).then(complete).catch(failed);
    }
    //toDo => count should be equal with maxcount that we got from backend
    function getAlljobs(count, offset) {
        return $http.get(`/api/jobs?count=${count}&offset=${offset}`).then(complete).catch(failed);
    };

    function getOnejob(id) {
        return $http.get("/api/jobs/" + id).then(complete).catch(failed);
    };

    function complete(response) {
        console.log(response.data);
        return response.data;
    };

    function failed(error) {
        return error.status.statusText;
    }

    // function removecache() {

    //     $http.defaults.headers.get['Cache-Control'] = 'no-cache';
    //     $http.defaults.headers.get['Pragma'] = 'no-cache';
    // }
}