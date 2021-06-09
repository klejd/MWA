angular.module("meanGames").factory("UserDataFactory", UserDataFactory);

function UserDataFactory($http) {
    return {
        login: login,
        getCurrentUser: getCurrentUser
    }

    function login(user) {
        return $http.post("/api/auth", user).then(complete).catch(failed);
    }

    function getCurrentUser(success, error) {
        token = localStorage.getItem('token')
        return $http.get("/api/user", {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(success).catch(error);
    }


    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}