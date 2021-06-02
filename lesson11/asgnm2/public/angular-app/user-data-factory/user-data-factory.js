angular.module("meanGames").factory("UserDataFactory", UserDataFactory)

function UserDataFactory($http) {
    return {
        login: login
    };

    function login(user) {
        return $http.post("/api/auth", user).then(complete).catch(failed)
    }

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