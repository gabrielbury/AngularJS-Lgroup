
(function () {

    var app = angular.module('app', []);

    app.controller('objetoController', objetoController);

    objetoController.$inject = ['$scope'];

    function objetoController($scope) {

        //O que é um objeto em Js???
        //Resposta: é uma chave e um valor!!!
        var pessoa = {
            nome: 'Fábio',
            email: 'fabison@ig.com.br',
            idade: 30,
            sexo: 'Masculino'
        };

        var nome = pessoa['nome'];
        //ou
        var nome = pessoa.nome;

        //percorrer todas as propriedades:
        for (var item in pessoa) {
            alert("nome: " + item + "\n" +
                  "valor: " + pessoa[item]);
        }
    }
})();