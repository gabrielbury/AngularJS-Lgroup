
(function() {

    //Criar um provider é analogo aos outros services
    angular.module('app')
        .provider('getData', getDataProvider);

    function getDataProvider() {

        var _location = 'pt-br';

        this.update = function(location) {
            _location = location;
        };

        //Todo provider executa uma função $get automaticamente!!
        this.$get = function() {
            return {
                Dia: _location == 'pt-br' ? new Date().getDate('dd')
                    : new Date().getDate('dd') + 1,
                Mes: new Date().getMonth() + 1,
                Ano: new Date().getFullYear()
            };
        };
    }
})();