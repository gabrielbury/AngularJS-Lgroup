
(function() {
    
    //Por padrão o nome da factory tem factory
    angular.module('app')
        .factory('usuarioFactory', usuarioFactory);

    function usuarioFactory() {

        var factorie = {
            usuarioSelecionado : {}
        };

        return factorie;
    }

})();