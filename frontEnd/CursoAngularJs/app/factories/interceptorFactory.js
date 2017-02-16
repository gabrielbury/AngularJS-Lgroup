
(function() {

    angular.module('app')
        .factory('interceptorFactory', interceptorFactory);

    interceptorFactory.$inject = ['localStorageService', '$q', 'errorConstant', '$rootScope']

    //A Factoy é uma recita de bolo!!
    function interceptorFactory(localStorageService, $q, errorConstant, $rootScope) {

        //Request
        //Response
        //ResponseError
        var factory =  // Defini a factory de acordo com o padrão
        {
            request: function(config) {
                //Interceptar a requisição e colocar o token no 
                //header da requisição

                var session = localStorageService.get("dadosAutenticacao");
                if (session != null) {
                    config.headers['Authorization'] = 'bearer ' + session.token;
                    $rootScope.usuario = session.nomeUsuario;
                }

                return config || $q.when(config);
            },
            response: function (config) {

                return config;
            },
            responseError: function (config) {

                //Definir um dicionário, de forma que 
                //quando um erro ocorrer a gente saiba qual tela
                //vamos enviar o erro
                var dicionario = {
                    400: errorConstant.badRequest,
                    401: errorConstant.notAuthorized,
                    403: errorConstant.notAuthentication,
                    419: errorConstant.sessionTimeout,
                    440: errorConstant.sessionTimeout,
                    404: errorConstant.notFound
                };

                //Vamos criar um broadcast de tal forma que
                //quando ocorrer algum erro, agente acione
                //o evento associado!!
                var erro = dicionario[config.status];

                $rootScope.$broadcast(erro, config);

                return $q.reject(config);
            }
        };

        //Retornando a factory
        return factory;
    }

})();