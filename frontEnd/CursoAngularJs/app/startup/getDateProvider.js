
(function() {
    angular.module('app')
        .config(getData);

    getData.$inject = ['getDataProvider'];

    function getData(getDataProvider) {
        getDataProvider.update('en-US');
    }
})();