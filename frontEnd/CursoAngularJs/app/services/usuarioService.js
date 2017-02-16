
(function() {

    //Criando um service
    angular.module('app')
        .service('usuarioService', usuarioService);

    //Services é uma Função contrutora
    //Existe um serviço que faz a comunicação com o servidor ($http)

    usuarioService.$inject = ['$http', 'api'];

    //referenciar a injeção 
    function usuarioService($http, api) {

        //Definimos uma url
        var url = api + 'usuario';

        this.usuarios = getUsuarios;
        this.addUsuario = addUsuario;

        function addUsuario(usuario) {

            return $http.post(url, usuario);
        }

        function getUsuarios() {

            //Iremos passar fazer uma requisição para a api
            //Com o método Get
            return $http.get(url);
        }
    }

    usuarioService.prototype.idade = 30;

})();