
(function() {

    angular.module('app')
        .controller('detalhesUsuarioController', detalhesUsuarioController);

    detalhesUsuarioController.$inject = ['$scope', 'usuarioFactory', '$rootScope'];

    //A Factory foi inicializada na controller usuarioController
    function detalhesUsuarioController($scope, usuarioFactory, $rootScope) {

        $scope.usuarioSelecionado = usuarioFactory.usuarioSelecionado;
    }

})();