
(function() {
    
    //Referenciando o modulo
    angular.module('app')
        .controller('usuarioController', usuarioController);

    //Injentado um scope na controller
    //Para pegar uma estrutura externa deve-se injetá-la
    usuarioController.$inject = ['$scope', 'usuarioService', 'usuarioFactory',
    '$location', '$rootScope', 'usuario2Service', 'getData',
    'profissoesService', '$filter'];

    //Se injetou deve referenciar no parametro
    function usuarioController($scope, usuarioService,
        usuarioFactory, $location, $rootScope, usuario2Service,
        getData, profissoesService, $filter) {

        //Posso definir variaveis
        $scope.titulo = 'Sistema de cadastro de usuario da Usuario Controller';
        profissoesService.profissoes().then(sucessp, failp);

        function sucessp(response) {
            $scope.profissoes = response;
        }
        //watch => intercepta o two way data binding do angular
        $scope.$watch('formulario.profissao', watchProfissoes);

        //O callback do watch
        function watchProfissoes(novoValor, antigoValor) {

            if (novoValor == undefined)
                return;

            //if (novoValor.nome == "Desenvovedor Front-end")
            if (novoValor.id == 2)
                alert('programador frontEnd');
        }

        function failp(response){}

        //usando $resource
        //Queremos retornar todos os usuários
        //Usarmos o item query!!!!
        //usuario2Service.usuarios()
        //    .query(function(response) {
        //        var retorno = response;
        //    });

        //Queremos retornar apenas 1 
        //usuario2Service.usuarios()
        //    .get({ id: 1 }, function(response) {
        //    var retorno = response;
        //});

        //Posso definir funcoes.
        $scope.addUsuario = addUsuario;

        //Posso definir uma colecao
        //O UsuarioService.usuarios() irá retornar um promise
        usuarioService
            .usuarios().then(sucess, fail);

        //Se retornar algo será redirecionado para o sucess
        function sucess(response) {

            var outroParametro = 2;
            //modelo de uso de um filter na controller
            var filtro = $filter('usuarioFilter')(response.data, outroParametro);
            $scope.usuarios = response.data;
        }

        //Se ocorrer alguma falha será redirecionado para o fail
        function fail(response) {
            $scope.usuarios = response.data.message;
        }

        function addUsuario(usuario) {
            // Assim estamos cadastrando sempre o mesmo usuario
            //$scope.usuarios.push(angular.copy(usuario));

            //Queremos fazer um Post com $resource
            //usuario2Service.usuarios().save({}, usuario,
            //    function (response) {
            //        var retorno = response;
            //    });

            usuarioService.addUsuario(usuario)
                .then(sucessAdd, failAdd);

            function sucessAdd(response) {

                $scope.usuarios = response.data;
                $scope.formulario = {};
                $scope.formularioCadastro.$setPristine(true);
            }

            function failAdd(response) {}
        }
    }
})();