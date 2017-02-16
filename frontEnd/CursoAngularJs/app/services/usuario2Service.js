
(function() {
    
    //Uma outra forma de conectar-se com uma api
    angular.module('app')
        .service('usuario2Service', usuario2Service);

    //preciso de um servico chamado $resource
    usuario2Service.$inject = ['$resource', 'api'];

    function usuario2Service($resource, api) {

        //Modelo de rota para a nossa api de usuario
        var modeloRota = api + 'usuario/:id';
        //Definindo o resource
        var resource = $resource(modeloRota, { id: '@id' },
        {
            save: {
                method: 'Post',
                isArray: true
            }
        });

        this.usuarios = usuarios;

        function usuarios() {
            return resource;
        }
    }
})();