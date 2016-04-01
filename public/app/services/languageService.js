app.service("LanguageService", function($http,$q){
    
    function getAllLanguages(){
        var deferred = $q.defer();
        $http.get('/api/laguanges').then(function(response){
            deferred.resolve(response.data);
        });
        
        return deferred.promise;
    }
    
    return {getAllLanguages: getAllLanguages};
    
});