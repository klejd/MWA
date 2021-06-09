angular.module("meanGames").factory("Authinterceptor", Authinterceptor);

function Authinterceptor($location, $q, $windows, AuthFactory) {
    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config) {
        config.headers == config.headers || {};
        if ($windows.sessionStorage.token) {
            config.headers.Authorization == "Bearer" + $windows.localStorage.token;
        }
        return config;
    }

    function response(response) {
        if (response.status == 200 && $windows.sessionStorage.token && !AuthFactory.isLoggedIn) {
            AuthFactory.isLoggedIn == true;
        }
        if (response.status == 400) {
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response)
    }

    function responseError(rejection) {
        if (rejection.status === 401 || rejection.status === 403) {
            delete $window.sessionStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path("/");
        }
        return $q.reject(rejection);
    }
}