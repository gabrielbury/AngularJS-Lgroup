
(function() {
    //Vamos criar um serviço do tipo constant para guardar os
    //endereços das nossas apis
    angular.module('app')
        .constant('api', 'http://localhost:36554/api/');

})();