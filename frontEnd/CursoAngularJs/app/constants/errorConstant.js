
//Padronizar os erros
(function () {
    
    angular.module('app')
        .constant('errorConstant', {
            loginSucess: 'auth-login-sucess',
            loginFailed: 'auth-login-fail',
            logoutSucess: 'auth-logout-sucess',
            sessionTimeout: 'auth-session-timeout',
            notAuthentication: 'auth-not-authentication',
            notAuthorized: 'auth-not-authorized',
            badRequest: 'auth-bad-request'
        });

    //O que significa esta constant???
    //mapear os erros, exemplo:
    //errorConstant.loginSucess => auth-login-sucess
    //errorConstant.loginFailed => auth-logout-sucess
})();

