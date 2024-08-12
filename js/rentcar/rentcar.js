document.onreadystatechange = function () {
    var state = document.readyState;
    if (state == 'complete') {
        document.getElementById('interactive');
        document.getElementById('load').style.visibility="hidden";
    }
}

$(document).ready(function(){
    Filtros()
    request()
    back()
    buttomclick()
})

// Selecionar filtros
function Filtros(){
    
    $('.lista-item.categorias').click(function(){
        $('.lista-item.categorias').removeClass('active')
        $(this).addClass('active')
    })

    $('.lista-item.motoristas').click(function(){
        $('.lista-item.motoristas').removeClass('active')
        $(this).addClass('active')
    })

    $('.lista-item.combustiveis').click(function(){
        $('.lista-item.combustiveis').removeClass('active')
        $(this).addClass('active')
    })

    $('#resetar').click(function () {
        
        $('.lista-item.combustiveis').removeClass('active')
        $('.lista-item.motoristas').removeClass('active')
        $('.lista-item.categorias').removeClass('active')
        $("input[name='combustivel']").prop('checked', false);
        $("input[name='categoria']").prop('checked', false);
        $("input[name='motorista']").prop('checked', false);
        $("input[name='aplicar']").prop('checked', false);
    })
}

function back() {
    $('#back-location').click(function () {
        $('.smart-location').removeClass('closed')
        $('.smart-request-rentcar').addClass('closed')
    })

    $('#back-locations').click(function () {
        window.history.back();
    })
}

function buttomclick() {
    $('#open-reserva').click(function () {
        $('.reserva').toggleClass('open')
    })

    $('#edit-reserva').click(function () {
        $('.reserva').toggleClass('open')
    })

    $('#menu').click(function () {
        $('.menu').toggleClass('open')
        
    })

    $('#menu-closed').click(function () {
        $('.menu').toggleClass('open')
        
    })

    $('#menu-sublist').click(function () {
        $('.menu-sublist').toggleClass('open')
    })

    $('#historico').click(function () {
        $('.historico').toggleClass('open')
    })

    $('#historico-closed').click(function () {
        $('.historico').toggleClass('open')
        
    })

}


function request(){
    $('#request').on('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        $('.smart-location').addClass('closed')
        $('.smart-request-rentcar').removeClass('closed')
        var load=$('#load');
        load.addClass('visible')
        var formData = $(this).serialize(); // Serializa os dados do formulário
        $.ajax({
            url: $(this).attr('action'), // URL para onde enviar os dados
            type: 'POST', // Método HTTP para enviar os dados
            data: formData, // Dados a serem enviados
            success: function(response) {
                // O que fazer com a resposta do servidor
                if (response.veiculos && response.veiculos.length > 0) {
                    // Limpa o conteúdo atual antes de adicionar novos itens
                    $('.smart-request-item').empty();
                    load.removeClass('visible')
                    console.log(response); // Exemplo de como exibir a resposta no console

                    // Processar a lista de veículos
                    response.veiculos.forEach(function(veiculo) {
                        $('.smart-request-item').append(`
                        <div class="rentcar col-6">
                            <div class="rentcar-item m-2">
                                <div class="rentcar-header">
                                    <img src="${veiculo.imagem_veiculo}" alt="${veiculo.modelo}" class="rentcar-img">
                                    <div class="rentcar-marca">
                                        <span class="badge bg-smart">${veiculo.marca}</span>
                                    </div>
                                    <div class="rentcar-preco">
                                        <span class="badge bg-warning"><span class="rentcar-price">${veiculo.preco} MT<span>/${veiculo.condicao}</span></span></span>
                                    </div>
                                </div>
                                <div class="rentcar-info p-2 m-0">
                                    <div class="rentcar-info-header position-relative">
                                        <div class="rentcar-title text-success d-flex flex-column w-100">
                                            <h6 title="${veiculo.modelo}" class="text-truncate text-capitalize">${veiculo.modelo}</h6>
                                            <small class="text-truncate "> ${veiculo.disponivel? '<i class="fa fa-calendar-check fa-calendar-xmark"></i>' :'<i class="fa fa-calendar-xmark"></i>'} <span>${veiculo.disponivel? 'Disponível': 'Indisponível'}</span></small>
                                            <small title="${veiculo.localizacao}" class="text-truncate "><i class="fa fa-location-crosshairs"></i> <span>${veiculo.localizacao}</span></small>
                                        </div>
                                        ${ veiculo.telefone? `
                                        <div class="rentcar-owner position-absolute top-0 end-0">
                                            <a href="tel:+258{{veiculo.proprietario.proprietario.telefone}}"><i class="fa fa-phone text-success"></i></a>
                                        </div>`: ''
                                        }
                                    </div>
            
                                    <div class="d-flex flex-column gap-2 justify-content-between">
                                        <a href="${veiculo.solicitar}" id='reservar' class="btn btn-smart p-1 bg-smart">Reservar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                    });
                }else {
                    load.removeClass('visible')
                    $('.smart-request-item').html(`
                        <div class='d-flex justify-content-center align-items-center h-100 w-100'>
                            <small class='text-danger'>Nenhum veículo encontrado a esse alcance!</small>
                        </div>
                    `)
                }
            },
            error: function(xhr, status, error) {
                // O que fazer em caso de erro
                load.removeClass('visible')
            
                console.log(xhr.responseText); // Exemplo de como exibir o erro no console
            }
        });
    });
}