angular.module("meannobels").factory("nobelDataFactory", nobelDataFactory)

function nobelDataFactory($http) {
    return {
        getAllnobels: getAllnobels,
        getOnenobel: getOnenobel,
        addOnenobel: addOnenobel,
        deleteOnenobel: deleteOnenobel,
        deleteOnenobelIndex: deleteOnenobelIndex,
        FullUpdateOnenobel: FullUpdateOnenobel
    };

    function deleteOnenobelIndex(id) {
        return $http.delete("/api/nobels/" + id).then(complete).catch(failed);
    }

    function deleteOnenobel(id) {
        return $http.delete("/api/nobels/" + id).then(complete).catch(failed);
    }

    function FullUpdateOnenobel(id, nobel) {
        return $http.put("/api/nobels/" + id, nobel)
            .then(complete).catch(failed);
    }

    function addOnenobel(nobel) {
        return $http.post("/api/nobels/", nobel).then(complete).catch(failed);
    }
    //toDo => count should be equal with maxcount that we got from backend
    function getAllnobels(count, offset) {
        return $http.get(`/api/nobels?count=${count}&offset=${offset}`).then(complete).catch(failed);
    };

    function getOnenobel(id) {
        return $http.get("/api/nobels/" + id).then(complete).catch(failed);
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