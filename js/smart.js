// 1. Primeiro deve verificar se todos elementpos foram carregados
$(document).ready(function(){
    smart_rentcar_location_action()
    request()
    owl_carrossel()
    back_location()
})

function smart_rentcar_location_action() {
    $('.smart-rentcar-location-action').click(function () {
        $('.smart-rentcar-location').toggleClass('open')
    })
}

function back_location() {
    $('#back-location').click(function () {
        $('.smart-rentcar-location').toggleClass('closed')
        $('.smart-rentcar-lista').toggleClass('closed')
    })
}


function owl_carrossel() {
    // Categoria
    $(".categoria").owlCarousel({
        items: 1, // Número de itens visíveis
        loop: false, // Se o carrossel deve ser contínuo
        margin: 10, // Margem entre os itens
        dots:true,
        nav: false, // Mostrar setas de navegação
        responsive: {
            
            0: {
                items: 4 // Número de itens em telas pequenas
            },
            772: {
                items: 4 // Número de itens em telas médias
            },
            992: {
                items: 10 // Número de itens em telas grandes
            }
        }
    });

    // Adiciona evento de clique para marcar imagem selecionada
    $('.categoria .item').click(function() {
        // Remove a seleção anterior
        $('.categoria .item').removeClass('selected');
        
        // Marca a imagem clicada como selecionada
        $(this).addClass('selected');
    });

    // Marca
    $(".marca").owlCarousel({
        items: 1, // Número de itens visíveis
        loop: false, // Se o carrossel deve ser contínuo
        margin: 10, // Margem entre os itens
        dots:true,
        nav: false, // Mostrar setas de navegação
        responsive: {
            
            0: {
                items: 4 // Número de itens em telas pequenas
            },
            772: {
                items: 4 // Número de itens em telas médias
            },
            992: {
                items: 10 // Número de itens em telas grandes
            }
        }
    });

    // Adiciona evento de clique para marcar imagem selecionada
    $('.marca .item').click(function() {
        // Remove a seleção anterior
        $('.marca .item').removeClass('selected');
        
        // Marca a imagem clicada como selecionada
        $(this).addClass('selected');
    });


    $(".combustivel").owlCarousel({
        items: 2, // Número de itens visíveis
        loop: false, // Se o carrossel deve ser contínuo
        margin: 2, // Margem entre os itens
        dots:true,
        nav: false, // Mostrar setas de navegação
        responsive: {
            0: {
                items: 2 // Número de itens em telas pequenas
            },
            600: {
                items: 8 // Número de itens em telas médias
            },
            1000: {
                items: 10 // Número de itens em telas grandes
            }
        }
    });

    
    $(".motorista").owlCarousel({
        items: 2, // Número de itens visíveis
        loop: false, // Se o carrossel deve ser contínuo
        margin: 2, // Margem entre os itens
        dots:true,
        nav: false, // Mostrar setas de navegação
        responsive: {
            0: {
                items: 2 // Número de itens em telas pequenas
            },
            600: {
                items: 1 // Número de itens em telas médias
            },
            1000: {
                items: 10 // Número de itens em telas grandes
            }
        }
    });

    // Adiciona evento de clique para marcar imagem selecionada
    $('.combustivel .item').click(function() {
        // Remove a seleção anterior
        $('.combustivel .item').removeClass('selected');

        // Marca a imagem clicada como selecionada
        $(this).addClass('selected');
    });

    $('.motorista .item').click(function() {
        // Remove a seleção anterior
        $('.motorista .item').removeClass('selected');

        // Marca a imagem clicada como selecionada
        $(this).addClass('selected');
    });

    $('#condicao').select2({
        tags: true,
        placeholder: 'Selecione a condição',
        allowClear: true
    });

    $('#categoria').select2({
        tags: true,
        placeholder: 'Selecione a categoria',
        allowClear: true
    });

    $('#transmissao').select2({
        tags: true,
        placeholder: 'Selecione a trasmissão',
        allowClear: true
    });

    $('#combustivel').select2({
        tags: true,
        placeholder: 'Selecione o combustivel',
        allowClear: true
    });


    $('#marca').select2({
        tags: true,
        placeholder: 'Selecione a categoria',
        allowClear: true
    });

    $('#veiculo').select2({
        tags: true,
        placeholder: 'Selecione o veículo',
        allowClear: true
    });
}


