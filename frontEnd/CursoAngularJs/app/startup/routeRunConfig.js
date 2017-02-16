
(function () {

    angular.module('app')
        .run(routeRunConfig);

    routeRunConfig.$inject = ['$rootScope', 'oAuthFactory', '$location'];

    function routeRunConfig($rootScope, oAuthFactory, $location) {

        //Toda vez que a rota muda o evento abaixo é acionado!!!!
        $rootScope.$on('$routeChangeSuccess', function (event, next, current) {

            //Se tiver logado e for para o login, redirecionar para o cadastro usuario
            if (oAuthFactory.infoUsuario.autenticado
                && next.$$route.originalPath == '/') {
                $location.path('/cadastroUsuario');
            }
        });
    }

})();