$(function () {


    var User = function () {
        this.name = "";
        this.email = "";
        this.password = "";
        this.signUp = function () {

            return $.post("/user", {
                name: this.name,
                email: this.email,
                password: this.password
            });
        };
        this.signIn = function () {

            return $.post("/user/login", {
                email: this.email,
                password: this.password
            });
        }
    };





    $("#btnSignUp").click(function () {

        var user = new User();
        user.name = $("#modal-register #name").val();
        user.email = $("#modal-register #email").val();
        user.password = $("#modal-register #password").val();

        $("#btnSignUp").attr("disabled", "");
        $("#btnSignUp").text("Signing up...");

        user.signUp()
            .done(function (data) {
                $(".signup-modal .error-container").hide();
                window.sessionStorage.token = data.token;
                window.sessionStorage.user = data.user;
                top.location.href= '/dashboard';
            })
            .fail(function (data) {
                var errorMessage = data.responseJSON;

          

                $(".signup-modal .error-container").show();
                $(".signup-modal .error-container .error-message").text(errorMessage);
            })
            .always(function () {
                $("#btnSignUp").removeAttr("disabled");
                $("#btnSignUp").text("Sign up");

            });

    });

    $("#btnSignIn").click(function () {

        var user = new User();

        user.email = $("#modal-login #email").val();
        user.password = $("#modal-login #password").val();

        $("#btnSignIn").attr("disabled", "");
        $("#btnSignIn").text("Signing in...");

        user.signIn()
            .done(function (data) {
                $(".login-modal .error-container").hide();
                window.sessionStorage.token = data.token;
                window.sessionStorage.user = data.user;
                top.location.href= '/dashboard';
            })
            .fail(function (data) {
                var errorMessage = data.responseJSON;

                $(".login-modal .error-container").show();
                $(".login-modal .error-container .error-message").text(errorMessage);
            })
            .always(function () {
                $("#btnSignIn").removeAttr("disabled");
                $("#btnSignIn").text("Sign in");

            });

    });



    $('.modal').on('hidden.bs.modal', function (e) {
        $(this).find('form')[0].reset();
        $(this).find('.error-container').hide();
    });

});


