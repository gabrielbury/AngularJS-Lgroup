
(function () {
    angular.module('app')
        .directive('tbUsuarios', tbUsuarios);

    function tbUsuarios() {

        controller.$inject
            = ['$location', '$scope', 'usuarioFactory'];

        function controller($location, $scope, usuarioFactory) {

            $scope.selecionarUsuario = selecionarUsuario;

            //Callback que irá selecionar o usuario
            function selecionarUsuario(usuario) {

                usuarioFactory.usuarioSelecionado = usuario;
                $location.path('/detalhesUsuario');
            }
        }

        var directive = {

            restrict: 'AEC',
            templateUrl: 'app/views/directives/tbUsuarios.html',
            scope: {
                usuarios: '=xptousuarios',
            },
            controller: controller
        };

        return directive;
    }

})();