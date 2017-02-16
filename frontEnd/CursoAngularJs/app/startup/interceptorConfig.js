
//Iremos configurar o provider httpProvider => é o elemento 
//que está por trás do $http
(function() {
    angular.module('app')
        .config(interceptorConfig);

    interceptorConfig.$inject = ['$httpProvider'];

    function interceptorConfig($httpProvider) {
        //Quando houver qualquer requisição envia para um callback
        //Esta factory é um callback
        $httpProvider.interceptors.push('interceptorFactory');
    }

})();
