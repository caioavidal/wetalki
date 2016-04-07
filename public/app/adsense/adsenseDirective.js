app.directive("adsense", function(){
     return {
        restrict: 'A',
        templateUrl: 'app/adsense/partials/adsTpl',
        controller: function(){
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    };
});
    
