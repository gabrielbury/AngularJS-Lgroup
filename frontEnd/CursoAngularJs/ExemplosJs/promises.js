
(function() {

    var app = angular.module('app', []);
    app.controller('promisesController', promisesController);

    //$q => Este serrvice será responsável por fornecer a estrutura
    //de promises
    promisesController.$inject = ['$scope', '$q'];

    //Callback
    function promisesController($scope, $q) {

        $scope.addNumero = addNumero;
        $scope.resultado = undefined;

        //Quero definir uma promise que somente dê sucesso!!!
        //como faço isso!!!!
        //var pr = $q.defer(); => //resolve ou reject
        var prW = $q.when(1 + 1); //neste caso eu só tenho o resolve!!!!

        prW.then(sucess2);

        function sucess2(response) {
            var a = response
        }

        //Se eu quero somente uma falha
        var prR = $q.reject("Falha!!!"); //Nesta caso só temos falha

        prR.then(sucess2, fail2);

        function fail2(response) {
            var a = response;
        }

        //Testando a operação addNumero

        //addNumero(1, 2).then(success, fail);
        //addNumero(1, 'b').then(success, fail);

        var promises = [];

        var promise1 = addNumero(1, 200);
        var promise2 = addNumero(1, 3);
        var promise3 = addNumero(1, 4);

        //Quero ter apenas um sucess e um fail
        //Vou execultar todos os promises juntos
        //Se tudo der certo => chamo o sucess
        //Se algum der errado => chamo o fail
        promises.push(promise1);
        promises.push(promise2);
        promises.push(promise3);

        $q.all(promises)
            .then(success, fail)
            .finally(always);

        function always() {
            alert("Acabou => finalizou");
        }

        //Vai cair neste callback se o promises tiver execultado
        //o resolve
        function success(response) {
            $scope.resultado = response;
        }
        //Vai cair neste callback se o promises tiver execultado
        //o reject
        function fail(response) {
            $scope.resultado = response;
        }

        //Operação matemática
        function addNumero(a, b) {

            var pr = $q.defer();

            setTimeout(function() {

            //criar o promise
                if (angular.isNumber(a) && angular.isNumber(b)) {
                    //Caso tiver tudo certo dou Resolve
                    //Sucess
                    pr.resolve(a + b);
                } else {
                    //Caso algo ocorrer dou 
                    //fail
                    pr.reject("Dados inválidos");
                }
                
            }, b);

            return pr.promise;
        }
    }
})();