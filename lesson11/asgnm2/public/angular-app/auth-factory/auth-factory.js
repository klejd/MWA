angular.module("meanGames").factory("authFactory", authFactory);

function authFactory() {
    var auth = { isLoggedIn: false }
    return {
        auth: auth
    };



}