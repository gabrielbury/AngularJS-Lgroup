
(function () {

    angular.module('app')
        .controller('loginUsuarioController', loginUsuarioController);

    loginUsuarioController.$inject = ['$scope', '$location', 'oAuthFactory',
    '$rootScope', '$uibModal'];

    //O que a gente vai fazer?
    //1 - logar
    //2 - caso o usuario for autenticado redirecionamos para o cadatro de
    //usuario, caso contrário, uma mensagem vinda do backend será informada

    function loginUsuarioController($scope, $location, oAuthFactory, $rootScope, $uibModal) {

        $scope.logar = logar;
        $scope.abrirModal = abrirModal;

        function abrirModal(tipoModal) {

            //Para abrir o modal preciso saber o tipo do modal
            //E dá aonde ele é (controller e view)
            var instanciaModal = $uibModal.open({
                templateUrl: 'app/views/modals/modal.html', //View
                controller: 'modalController', //Controller
                size: tipoModal, //Tipo de modal
                animation: true, //Vai dar um toque a mais!!,
                resolve: {
                    valor: function () { return 'valor 1234' }
                }
            });

            //Pegando o resultado do modal
            instanciaModal.result.then(sucessModal, failModal);

            //Ok
            function sucessModal(response) {
                var a = response;
            }

            //Cancelar
            function failModal(response) {
                var b = response;
            }
        }

        //Esta função será responsavel por logar o usuário
        function logar(login) {
            
            $rootScope.$broadcast('onTeste', 'onTeste chamado!!!');

            //Fazer o login chamando a factory       
            oAuthFactory.logar(login).then(sucess, fail); //só conseguimos fazer com then,
            //pois, uma promise é retornada na factory oAuthFactory (função logar)

            function sucess(response) {
                $location.path('/cadastroUsuario');
            }
            function fail(response) {

                //O erro vem do backend!!!
                $scope.status = response.data.error_description;
            }
        }
    }
})();