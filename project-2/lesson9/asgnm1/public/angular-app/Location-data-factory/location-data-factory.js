angular.module("meanjobs").factory("locationDataFactory", locationDataFactory)

function locationDataFactory($http) {
    return {
        getAllLocation: getAllLocation,
        getOnelocation: getOnelocation,
        addOnelocation: addOnelocation,
        deleteOnelocation: deleteOnelocation,
        deleteOnelocationIndex: deleteOnelocationIndex,
        FullUpdateOnelocation: FullUpdateOnelocation,
        partialUpdatelocation: partialUpdatelocation
    };

    function deleteOnelocationIndex(id, locationId) {
        return $http.delete("/api/jobs/" + id + "locations/" + locationId).then(complete).catch(failed);
    }

    function deleteOnelocation(id, locationId) {
        return $http.delete("/api/jobs/" + id + "/locations/" + locationId).then(complete).catch(failed);
    }

    function FullUpdateOnelocation(id, locationId, location) {
        return $http.put("/api/jobs/" + id + "/locations/" + locationId, location)
            .then(complete).catch(failed);
    }

    function partialUpdatelocation(id, locationId, location) {
        return $http.patch("/api/jobs/" + id + "/locations/" + locationId, location)
            .then(complete).catch(failed);
    }

    function addOnelocation(id, location) {
        return $http.post("/api/jobs/" +
            id + "/locations/", location).then(complete).catch(failed);
    }

    function getAllLocation(id) {
        return $http.get("/api/jobs/" + id + "/locations").then(complete).catch(failed);
    };

    function getOnelocation(id, locationId) {
        return $http.get("/api/jobs/" + id, "locations/" + locationId).then(complete).catch(failed);
    };

    function complete(response) {
        console.log(response.data);
        return response.data;
    };

    function failed(error) {
        return error.status.statusText;
    }
}