angular.module("meanGames").controller("LoginController", LoginController);

function LoginController($window, $location, authFactory, UserDataFactory, jwtHelper) {
    const vm = this;
    vm.loggedInUser = "Name";

    vm.isActiveTab = function(url) {
        const currentPath = $location.path().split("/")[1];
        if (url === currentPath ? "active" : "");
    };
    vm.isLoggedIn = function() {
        return authFactory.auth.isLoggedIn;
        // if(authFactory.auth.isLoggedIn){
        //     return true;
        // }else{
        //     return false;
        // }
    };

    vm.login = function() {
        if (vm.username && vm.password) {
            const user = {
                username: vm.username,
                password: vm.password
            };

            UserDataFactory.login(user).then(function(response) {
                console.log(response);
                if (response && response.success) {
                    $window.sessionStorage.token = response.token;
                    authFactory.auth.isLoggedIn = true;
                    //Read the payload of a token
                    const token = $window.sessionStorage.token;
                    const decodedToken = jwtHelper.decodeToken(token);
                    vm.loggedInUser = decodedToken.name;
                    vm.username = "";
                    vm.password = "";
                    $location.path("/");

                }

            }).catch(function(error) {
                console.log(error);

            });


        }

    };

    vm.logout = function() {
        authFactory.auth.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path("/");

    };
}