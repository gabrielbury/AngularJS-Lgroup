
(function() {
    angular.module('app')
        .directive('btnSubmit', btnSubmit);
    //btnPrimaryTestLgroup => btn-primary-test-lgroup
    //<btn-submit></btn-submit> => Elemento
    //<div btn-submit></div> => Atributo de um elemento
    //<div class='btn-submit'></div> => Classe
    //<!--btn-submit--!> => Comentário

    //A nossa diretiva
    function btnSubmit() {

        //Podemos definir uma controller de forma igual a uma controller padrão
        controller.$inject = ['$scope'];

        function controller($scope) {
            $scope.titulo = "Cadastrar usuário";
        }

        //Retorna um objeto literal
        var directive = {

            restrict: 'AEC', //podemos representar como Atributo, 
            //Elemento ou classe
            //template:'<button type="submit">Salvar</button>'
            templateUrl: 'app/views/directives/btnSubmit.html',
            controller: controller,
            replace: true
        };

        return directive;
    }
})();