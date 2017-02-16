
(function () {

    //Será a factory responsavel pela autenticação
    angular.module('app')
        .factory('oAuthFactory', oAuthFactory);
    
    //localStorageService => serviço responsavel por guardar uma variavel
    //dentro de localStorade
    oAuthFactory.$inject = ['oAuthService', 'localStorageService', '$q', '$location'];

    //Callback
    function oAuthFactory(oAuthService, localStorageService, $q, $location) {

        //Vamos criar uma factory que tem a função dos seguintes itens:
        //Logar
        //Deslogar
        //Informações do usuário
        var factory = {
            logar: logar,
            desLogar: desLogar,
            infoUsuario: {
                autenticado: false,
                nomeUsuario: ''
            }
        };

        //Login => Logar
        function logar(login) {

            //Usando promises
            //Criando uma estrutura de promises
            var defered = $q.defer();

            //Fazendo o login usando o service
            oAuthService.logar(login).then(sucess, fail);

            function sucess(response) {
                //Guarndando as informações dentro de algum lugar
                //Factory ou localStorage!!!
                localStorageService.set('dadosAutenticacao', {
                    //O token e o nome está sendo resgatado no backend
                    token: response.data.access_token,
                    //O nome está pascalCase, pois, não tratamos o formato do response do token
                    nomeUsuario: response.data.UsuarioNome
                });

                factory.infoUsuario.autenticado = true;
                factory.infoUsuario.nomeUsuario = 'aluno LGroup';

                //Caso der tudo certo => relvendo a promise!!
                defered.resolve(response);
            }
            
            function fail(response){
                //logoff
                //rejeitar a promise
                defered.reject(response);
            }
            //Tenho que retornar um promise, pois, no login estamos
            //usando then
            return defered.promise;
        }

        function desLogar() {
            //remover tudo que esta dentro do localStorage ou da factory
            localStorageService.remove('dadosAutenticacao');

            factory.infoUsuario.autenticado = false;
            factory.infoUsuario.nomeUsuario = '';
            //enviar para o login do usuário.
            $location.path('/');
        }

        return factory;
    }
})();