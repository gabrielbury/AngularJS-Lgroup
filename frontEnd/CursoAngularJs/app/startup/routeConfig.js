
(function() {
    
    //Criar uma configuração para a nossa rota
    //Para este fim teremos que usar o item config => que executa 
    //A função associada a ele quando seu js for referenciado

    angular.module('app')
        .config(routeConfig);

    //$routeProvider => pacote ngRoute
    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {

        $routeProvider.when('/', {
            //Referenciando a página que será renderizada no Index.html
            templateUrl: 'app/views/loginUsuario.html',
            controller: 'loginUsuarioController'
        }).when('/cadastroUsuario', {
            //Referenciando a página que será renderizada no Index.html
            templateUrl: 'app/views/cadastroUsuario.html'
        }).when('/detalhesUsuario', {
            templateUrl: 'app/views/detalhesUsuario.html',
            controller: 'detalhesUsuarioController'
        });
    }
})();