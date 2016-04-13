$(function() {


    var User = function() {
        this.name = "";
        this.email = "";
        this.password = "";
    };


    User.prototype = {
        signUp: function() {

            $.post("/user", this, function(data) {
                console.log(data);
            });
        }
    }

    $("#btnSignUp").click(function() {

        var user = new User();
        user.name = $("#modal-register #name").val();
        user.email = $("#modal-register #email").val();
        user.password = $("#modal-register #password").val();
        
        user.signUp();

    });

});


