
(function() {
    angular.module('app')
        .directive('headerCustom', headerCustom);

    function headerCustom() {
        
        var directive = {
            restrict: 'AECM', //M => Comentário
            templateUrl: 'app/views/directives/headerCustom.html',
            scope: {
                subtitulo: '@subtitulo'
            },
            transclude:true
        };

        return directive;
    }

})();