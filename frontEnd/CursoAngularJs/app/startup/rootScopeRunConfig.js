
(function() {

    //O metodo sempre será chamado!!!
    //Basta apenas referencia-lo
    //Porém ele é chamado antes dos controller, services etc..
    //e Depois do Config
    angular.module('app')
        .run(rootScopeRunConfig);

    //Uma variavel global pode ser feita usando o rootScope
    rootScopeRunConfig.$inject = ['$rootScope', 'localStorageService'];

    function rootScopeRunConfig($rootScope, localStorageService) {
        $rootScope.titulo = "Sistema de gerenciamento de usuário!!";

        //Definimos uma varivel vázia
        $rootScope.usuario = "";

        //Toda vez que alguém fazer um broadCast para a function
        //onTeste o item abaixo será disparado;
        //assinatura
        $rootScope.$on('onTeste', onTesteCallback);

        function onTesteCallback(event, data) {
            alert(data);
        }
    }

})();