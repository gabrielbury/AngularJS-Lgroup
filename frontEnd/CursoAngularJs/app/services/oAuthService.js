
(function () {

    angular.module('app')
        .service('oAuthService', oAuthService);
    
    //Dado um endereço (constant)
    //usar o $http para fazer a requisição
    oAuthService.$inject = ['$http', 'api'];

    //Criando o service
    function oAuthService($http, api) {

        //Estrutura do service (this)
        this.logar = logar;

        //callback
        function logar(login) {

            //O que a gente precisa fazer no login?????
            //passar : grant_type, userName, password (oAuth2)
            //Estrutura de login!!
            var data = "grant_type=password&userName=" + login.nome
                + "&password=" + login.senha;

            return $http.post(api + 'login', data, {
                header: { 'Content-type': 'application/x-www-form-urlencoded' }
            });

        }
    }
})();