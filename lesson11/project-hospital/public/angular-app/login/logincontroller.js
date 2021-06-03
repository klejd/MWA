angular.module("meanGames").controller("LoginController", LoginController);

function LoginController($window, $location, AuthFactory, UserDataFactory, jwtHelper) {
    const vm = this;
    // vm.isLoggedIn = function() {
    //     if (AuthFactory.isLoggedIn) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // vm.loggedInUser = "Klejdi";

    vm.isActiveTab = function(url) {
        const currentPath = $location.path().split("/")[1];
        if (url === currentPath ? "active" : "");
    };
    vm.isLoggedIn = function() {
        if (AuthFactory.auth.isLoggedIn) {
            return true;
        } else {
            return false
        }
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
                    // localStorage.token = response.token;
                    localStorage.setItem('token', response.token);
                    AuthFactory.auth.isLoggedIn = true;
                    //Read the payload of a token
                    const token = localStorage.token;
                    const decodedToken = jwtHelper.decodeToken(token);
                    // vm.loggedInUser = decodedToken.name;
                    UserDataFactory.getCurrentUser(function(response) {
                        // vm.verifytoken = response.token,
                        vm.loggedInUser = response.username
                    });
                    vm.username = "";
                    vm.password = "";
                    $location.path("/");

                }
                // jo ska lidhje duhet te maresh sa her current user

            }).catch(function(error) {
                console.log(error);

            });


        }

    };

    vm.logout = function() {
        AuthFactory.auth.isLoggedIn = false;
        delete localStorage.token;
        $location.path("/");

    };
}