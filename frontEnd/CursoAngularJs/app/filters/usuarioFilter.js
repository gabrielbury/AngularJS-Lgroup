
(function () {
    
    //Criar um filtro
    angular.module('app')
        .filter('usuarioFilter', usuarioFilter);

    //Callback
    function usuarioFilter() {

        //O Filter é uma função que retorna outra função
        var filter = function (inputs, outroParametro) {

            //Validações
            if (inputs == undefined)
                return;

            //Definindo os itens que serão filtrados
            var itensFiltrados = [];

            //Regra para o filtro
            for (var i = 0; i < inputs.length; i++) {
                //Verificando se o nome é igual a fabio e o salario é iguar a zero
                if (inputs[i].nome.toLowerCase() == 'fabio' && inputs[i].salario == 0)
                    //caso positivo insiro este item na variavel "itensFiltrados"
                    itensFiltrados.push(inputs[i])
            }

            //Retorno o filtro (inputs filtrados)
            return itensFiltrados;
        };

        return filter;
    }

})();
