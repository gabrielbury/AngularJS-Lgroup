
(function() {
    angular.module('app')
        .service('profissoesService', profissoesService);

    profissoesService.$inject = ['$q'];

    function profissoesService($q) {

        this.profissoes = get;

        function get() {
            //Cria a estrutura de promise
            var pr = $q.defer();

            var prof = [
                { id: 1, nome: 'DBA' },
                { id: 2, nome: 'Desenvovedor Front-end' },
                { id: 3, nome: 'Designer' },
                { id: 4, nome: 'Analista de Suporte' }];
            //Ok no promise
            pr.resolve(prof);

            //retornando o promise
            return pr.promise;
        }
    }
})();