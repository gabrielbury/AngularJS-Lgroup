
(function () {

    //O controller do modal
    angular.module('app')
        .controller("modalController", modalController);

    //O modal ele tem um $scope
    modalController.$inject = ['$scope', '$uibModalInstance', 'valor'];

    //Definindo o callback
    function modalController($scope, $uibModalInstance, valor) {

        $scope.ok = ok; //Quando o cara aperta ok
        $scope.cancelar = cancelar; //Quando o usuario apertar cancelar
        //Quando o usuario apertar ok o modal irá fechar
        function ok(dados) {
            $uibModalInstance.close(dados); //Sucess da controller
        }
        
        function cancelar() {
            $uibModalInstance.dismiss('Item cancelado') //Chama o Fail da controller
        }
    }

})();