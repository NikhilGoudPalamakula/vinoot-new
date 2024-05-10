jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction('frontend/element_ready/rform_phone.default', function ($scope, $) {
        $('.rform-input-tel').each(function() {
            var iti = window.intlTelInput(this, {
              separateDialCode: true,
              utilsScript: intl_tel_input_script.url,
            });
        
            // Menyimpan instance variabel sehingga bisa diakses dalam console, misalnya window.iti.getNumber()
            $(this).data('iti', iti);
          });
    });
});