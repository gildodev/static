var spinner = $('.proccessing-smart');
spinner.hide()
var alerta=$('.alerta')
var alertapassword=$('.alerta-password')

$(document).ready(function() {
    smartcadastroservice()
    login()
    cadastro()
    selectservice()
});


function login() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        var form = $(this);
        spinner.show(); // Show the spinner
       
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: form.serialize(),
            success: function(response) {

                spinner.hide(); // Hide the spinner
                // Handle the success response
                if (response.success) {
                    window.location.href = response.redirect_url; // Redirect on success
                } else {
                    alerta.show()
                    alerta.html(response); // Show error message
                }
            },
            error: function(xhr) {
                spinner.hide(); // Hide the spinner
                alerta.show()
                var errorMessage='Por favor, tente novamente!'
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message; // Usa a mensagem de erro retornada pela API
                }
                alerta.html(errorMessage)
                console.log(errorMessage)
            }
        });

        setTimeout(function(){
            alerta.hide()
        }, 10000)
    });
}

function cadastro() {

    $('#cadastro-form').on('submit', function(event) {
        event.preventDefault();
        spinner.show();
        if (validadepassowrd()) {
            var form=$(this)

            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: form.serialize(),
                success: function(response) {
                    spinner.hide(); // Hide the spinner
                    // Handle the success response
                    if (response.success) {
                        window.location.href = response.redirect_url; // Redirect on success
                    } else {
                        alerta.text(response.message || 'Erro desconhecido.') // Show error message
                        console.log(response)
                    }
                },
                error: function(xhr) {
                    spinner.hide(); // Hide the spinner
                    var errorMessage='Por favor, tente novamente!'
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMessage = xhr.responseJSON.message; // Usa a mensagem de erro retornada pela API
                    }
                    alerta.text(errorMessage)
                    alert(1)
                }
            });
        }else{
            spinner.hide();
            setTimeout(function(){
                alerta.hide()
            }, 5000)
        }

    })
    
}

function smartcadastroservice() {
    $('.smart-cadastro-service-action').click(function(event) {
        // Impede que o clique se propague para o elemento pai
        event.stopPropagation();
        
        var $service = $(this).closest('.smart-cadastro-service');
        
        // Remove a classe 'active' de todos os elementos
        $('.smart-cadastro-service').not($service).removeClass('active');
        
        // Alterna a classe 'active' no elemento pai
        $service.toggleClass('active');
    });
}

function validadepassowrd() {
    // Validate password and confirmation
    var password = $('#password').val();
    var confirmPassword = $('#confirmpassowrd').val();
    var errors = [];

    return true;
    // Check password validity
    if (!/(?=.*[0-9])/.test(password)) {
        errors.push('O password deve conter no minímo um número.');
    }
    if (!/(?=.*[a-z])/.test(password)) {
        errors.push('O password deve conter no minímo uma letra minuscula.');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
        errors.push('O password deve conter no minímo uma letra maiúscula.');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
        errors.push('O password deve conter no minímo caracteres especiais (@,*,$,!,#,..).');
    }

    // Check password length
    if (password.length < 8) {
        errors.push('O password não é seguro.');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errors.push('A tua senha não é a mesma.');
    }

    // Display errors
    alertapassword.html(errors.join('<br>'));
    setTimeout(function(){
        alertapassword.hide()
    }, 5000)
    // If there are no errors, submit the form
    if (errors.length === 0) {
        return true
        //$('#cadastro-form').off('submit').submit(); // Remove validation and submit
    }

    return false
}

function selectservice() {
    $('.smart-service-header').click(function () {
        $('.smart-services').toggleClass('active')
    })

    $('.smart-service-select').click(function () {
        $('.smart-services').toggleClass('active')
        $('.smart-service-select').removeClass('active')
        $(this).addClass('active')
        var servico=$(this).data('service')
        $('.smart-service-title').removeClass('text-secondary')
        $('.smart-service-title').html(`<i class="fa fa-user-tag text-smart"></i> ${servico}`)
    })

}

function cadastroProf() {
    $('#cadastro-form').on('submit', function(event) {
        event.preventDefault();
        spinner.show();
        if (validadepassowrd()) {
            var form=$(this)
            console.log(form.attr('action'))
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: form.serialize(),
                success: function(response) {
                    spinner.hide(); // Hide the spinner
                    // Handle the success response
                    if (response.success) {
                        window.location.href = response.redirect_url; // Redirect on success
                    } else {
                        alerta.text(response.message) // Show error message
                    }
                },
                error: function(xhr) {
                    spinner.hide(); // Hide the spinner
                    var errorMessage='Por favor, tente novamente!'
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMessage = xhr.responseJSON.message; // Usa a mensagem de erro retornada pela API
                    }
                    alerta.text(errorMessage)
                }
            });
        }else{
            spinner.hide();
        }

    })
}