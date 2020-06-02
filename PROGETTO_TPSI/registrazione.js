"use strict"

$(document).ready(function() {
    let _email = $("#email");
    let _address = $("#adr");
    let _cmbPayment=$("#cmbPayment");
    let _lblErrore = $("#lblError").hide();


    $("#btnPay").on("click",controllaPagamento);

    // il submit deve partire anche senza click
    // ma con il solo tasto INVIO
    $(document).on('keydown', function(event) {
        if (event.keyCode == 13)
            controllaPagamento();
    });

    function controllaPagamento(){
        _email.removeClass("is-invalid");  // bordo rosso textbox
        _email.prev().removeClass("icona-rossa");  // colore icona
        _address.removeClass("is-invalid");
        _address.prev().removeClass("icona-rossa");

        _lblErrore.hide();

        if (_email.val() == "" || !isValidEmailAddress( _email.val() )) {
            _email.addClass("is-invalid"); // bordo rosso textbox
            _email.prev().addClass("icona-rossa"); // colore icona
            _lblErrore.show();
        }
        else if (_address.val() == "") {
            _address.addClass("is-invalid"); // bordo rosso textbox
            _address.prev().addClass("icona-rossa"); // colore icona
            _lblErrore.show();
        }
        else if(_cmbPayment.val()=="null")
        {
            _cmbPayment.addClass("is-invalid");
            _cmbPayment.prev().addClass("icona-rossa"); // colore icona
            _lblErrore.show();
        }
        else{
            let em=_email.val();
            let adr=_address.val();
            let modePayment=_cmbPayment.val();
            $.ajax({
                url:"server/order.php",
                method:"POST",
                data:{"email":em,"address":adr,"modePayment":modePayment},
                success:function (data) {
					if(data.ris="ok")
						window.location.href="pageFinale.html"
                }
            })

        }
    }
    _lblErrore.children("button").on("click", function(){
        _lblErrore.hide();
    });

});

function isValidEmailAddress(emailAddress) {
    let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}