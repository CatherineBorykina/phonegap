/*define(function () {
    return function () {
        alert('Hello Im in alert');
    };
});

*/

define(function () {
    return function () {

        $("#contactForm").submit(function (e) {


            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email_1").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            if (name == '' || email == '' || phone == '' || message == '') {
                alert("Please Fill All Fields");
            } else {

                $.ajax({
                        url: "https://rich-hildred.rhcloud.com/Mailer/7aa2be",
                        type: "GET",
                        data: {
                            subject: "message from " + name + "phone: " + phone,
                            email: email,
                            message: message
                        },
                        cache: false,
                        success: function () {
                            // Success message
                            $('#success').html("<div class='alert alert-success'>");
                            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-success')
                                .append("<strong>Your message has been sent. </strong>");
                            $('#success > .alert-success')
                                .append('</div>');

                            //clear all fields
                            $('#contactForm').trigger("reset");
                        },
                        error: function () {
                            // Fail message
                            $('#success').html("<div class='alert alert-danger'>");
                            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                                .append("</button>");
                            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                            $('#success > .alert-danger').append('</div>');
                            //clear all fields
                            $('#contactForm').trigger("reset");
                        }
                });
            $("a[data-toggle=\"tab\"]").click(function (e) {
                e.preventDefault();
                $(this).tab("show");
            });



            /*When clicking on Full hide fail/success boxes */
            $('#name').focus(function () {
                $('#success').html('');
            });
            }
                return false;
        }); //submit function

    };

});//define function