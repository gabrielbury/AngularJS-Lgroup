
//Vamos padronizar todos os erros.
//Logo se ocorrer erro de login, por exemplo, esta página 
//será chamada!!!!
(function () {

    angular.module('app')
        .run(errorRunConfig);

    errorRunConfig.$inject = ['$rootScope', '$location'
        , 'oAuthFactory'];

    //Todo erro será gerenciado 
    //Quando houver erro de login redirecionaremos o usuario para o login
    //Caso para uma página de erro!!!
    function errorRunConfig($rootScope, $location, oAuthFactory) {

        $rootScope.$on('auth-login-fail', authLoginFail);
        $rootScope.$on('auth-session-timeout', errorApplication);
        $rootScope.$on('auth-not-authentication', authLoginFail);
        $rootScope.$on('auth-not-authorized', authLoginFail);
        $rootScope.$on('auth-bad-request', authLoginFail);

        function authLoginFail(event, data) {
            oAuthFactory.desLogar();
        }

        function errorApplication(event, data) {
            $location.path('/errorPage/' + data.error_description);
        }
    }

})();