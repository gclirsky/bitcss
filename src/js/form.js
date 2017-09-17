var JQuery = require("jquery");

(function ($) {
    $( document ).ready(function () {
        var input_selector = 'input[type=text], input[type=password]';
        // Add active when element has focus
        $(document).on('focus', input_selector, function () {
            $(this).siblings('label').addClass('active');
        });

        $(document).on('blur', input_selector, function () {
            if ($(this).val().length === 0) {
                $(this).siblings('label').removeClass('active');
            }
        });
    })
})( JQuery )