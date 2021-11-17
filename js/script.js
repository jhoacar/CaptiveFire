const messageAlerts = {

	successEnglish:
		"<div class='form-group' >\
		<div class='alert alert-success' role='alert'> \
			<strong>Message Sent!</strong> We'll be in touch as soon as possible\
		</div>\
	</div>",


	errorEnglish:
		"<div class='form-group' >\
		<div class='alert alert-danger' role='alert'> \
			<strong>Oops!</strong> Sorry, an error occurred. Try again.\
		</div>\
	</div>",

	successSpanish:
		"<div class='form-group' >\
		<div class='alert alert-success' role='alert'> \
			<strong>Mensaje enviado!</strong> Me comunicare contigo tan pronto sea posible!\
		</div>\
	</div>",


	errorSpanish:
		"<div class='form-group' >\
		<div class='alert alert-danger' role='alert'> \
			<strong>Oops!</strong> Lo siento, Ha ocurrido un error. Intentalo de nuevo.\
		</div>\
	</div>"
};


const getErrorMessage = language => language.split("-")[0] === "es" ? messageAlerts.errorSpanish : messageAlerts.errorEnglish;

const getSuccesMessage = language => language.split("-")[0] === "es" ? messageAlerts.successSpanish : messageAlerts.successEnglish;

$(function () {
	
    "use strict";

    /*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val) {
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	}
	$('#contact-form').validator().on('submit', function (e) {

		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message

			e.preventDefault();
			var $this = $(this);

			$.ajax({

				url: 'mail.php',
				type: 'post',
				data: $this.serialize(),
				success: function (data) {

					if (isJSON(data)) {

						data = $.parseJSON(data);
						
						if (data['error'] == false) {

							$('#contact-form-result').html(getSuccesMessage(navigator.language || navigator.userLanguage));

							$('#contact-form').trigger('reset');

						} else {
							console.log(data["error"]);
							$('#contact-form-result').html(
								"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='fa fa-stop' ></i> \
									</button> \
									"+ "<strong>Ha ocurrido un error</strong>, intentelo de nuevo!" + "\
								</div>\
							</div>"
							);
						}


					} else {
						$('#contact-form-result').html(getErrorMessage(navigator.language || navigator.userLanguage));
					}

				},
				error: function () {
					$('#contact-form-result').html(getErrorMessage(navigator.language || navigator.userLanguage));
				}
			});
		}
	});



});