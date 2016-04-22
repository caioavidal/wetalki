app.factory('Noty', function ($rootScope) {


    // $.noty.defaults = {
    //     theme: 'relax',
    //     layout: 'topRight',
    //     animation: {
    //         open: 'animated flipInX', // Animate.css class names
    //         close: 'animated flipOutX', // Animate.css class names
    //     }
    // };



    return {
        confirm: function (text, yesCallback, noCallback) {

            noty({
                text: text,
                theme: 'relax',
                layout: 'topRight',
                animation: {
                    open: 'animated flipInX', // Animate.css class names
                    close: 'animated flipOutX', // Animate.css class names
                },
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Yes, I do', onClick: function ($noty) {
                            $noty.close();
                            $rootScope.$apply(function () {
                                yesCallback.apply();
                            });
                        }
                    },
                    {
                        addClass: 'btn btn-danger', text: "No, I don't", onClick: function ($noty) {
                            $noty.close();
                            $rootScope.$apply(function () {
                                noCallback.apply();
                            });
                        }
                    }
                ]
            });

        },
        info: function (text) {
            noty({
                timeout: 5,
                type: 'information',
                text: text,
                theme: 'relax',
                layout: 'topRight',
                animation: {
                    open: 'animated flipInX', // Animate.css class names
                    close: 'animated flipOutX', // Animate.css class names
                }
            });
        },
        error: function (text) {
            noty({
                timeout: 5,
                type: 'error',
                text: text,
                theme: 'relax',
                layout: 'topRight',
                animation: {
                    open: 'animated flipInX', // Animate.css class names
                    close: 'animated flipOutX', // Animate.css class names
                }
            });
        }
    };
});