app.controller('IndexController', ['$scope', '$location','LanguageService',function($scope,$location, LanguageService) {
    var self = this;
    var socket = io('/');
    self.vm = new IndexViewModel();

    

    this.init = function() {
        this.registerNumUsersOnline();
        
        LanguageService.getAllLanguages().then(function(languages){
            self.vm.languages = languages;
        });
    }


    this.registerNumUsersOnline = function() {
        socket.on("numUsersOnline", function(numUsersOnline) {
            self.vm.numUsersOnline = numUsersOnline;
            $scope.$apply();
        });
    }
    
    this.goToOneToOneChatRoom = function(selectedLanguage){
        //window.location.href = "/"
        $location.path("chat/" + selectedLanguage.value);
    }
    
    
    
    this.init();
  


}]);