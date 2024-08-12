$(document).ready(function(){
    
    cancelarReservas()
    HistoricoReservas()
    actualizaReservas()
    $('#cancela').click(function (params) {
        $('#rentcar-profiss-reserva').toggleClass('open')
        $('#rentcar-profiss-cancelar').toggleClass('open')
    })
    Totalpendentes()
    maps()
})

// Lista para armazenar IDs dos dados já exibidos
let HistoricosExibidos = [];

// Lista para armazenar IDs dos dados já exibidos
let ReservasExibidos = [];


setInterval(function () {
    Totalpendentes()
    HistoricoReservas()
    actualizaReservas()
}, 10000);


function cancelarReservas(){
    $('#cancelar6').click(function() {
        $('.cancelar-form').append(`
        <div class="input-group smart-input-group">
            <input type="text" autofocus class="form-control smart-form-control pe-0" required name="razao" id="cancelar7" placeholder="Qual é o motivo?">
        </div>
        `)

        $('#cancelar6').hide()
    })
}

function HistoricoReservas()
{
    fetch('/rentcar/obter-reserva-todas/')
    .then(response => response.json())
    .then(data => {
        if(data.pendentes.length >0){
            const pendente_reserva=$('#reserva-historico')
            var conta=0
            data.pendentes.forEach(pendente => {
                pk_=pendente.pk
                if (HistoricosExibidos.includes(pendente.pk)) {
                    return
                }
                pendente_reserva.append(`
                <div class="profiss-reserva shadow mb-4">
                    <div class="profiss-reserva-header">
                    <div class="profiss-reserva-profile">
                        <div class="profiss-reserva-profile-img">
                            ${pendente.foto_perfil_cliente? '<img src="'+pendente.foto_perfil_cliente+'" alt="'+pendente.nome_cliente+'" >':'<span class="fa fa-user-circle fa-2x"></span>'}
                        </div>
                        <div class="profiss-reserva-profile-nome text-break">
                            <h6 class="m-0 p-0">${pendente.nome_cliente}</h6>
                            <small class="d-flex gap-2 align-items-center text-smart"> <i class="fa fa-car text-smart-90"></i>${pendente.placa}</small>
                        </div>
                    </div>
        
                    <div class="profiss-reserva-preco rounded-2 p-2 d-flex flex-column flex-wrap shadow bg-smart">
                        <p class="preco p-0 m-0 small">${pendente.preco}</p>
                        ${pendente.status != 'Cancelado'? `
                            <p class="p-0 m-0 small">Duração: ${pendente.duracao} Dia(s)</p>
                            <p class="p-0 m-0 small">Subtotal: ${pendente.preco_estimativa} MT</p>`:``
                        }
                        
                    </div>
                </div>
                <div class="profiss-reserva-body text-smart-90">
                    <h6 class="mt-2 px-2">${pendente.veiculo}</h6>
                    <div class="d-flex px-2 align-items-center justify-content-between">
                        <div> ${pendente.data_entrega}</div>
                        <div>-</div>
                        <div> ${pendente.data_devolucao}</div>
                    </div>

                    <div class="d-flex px-2 align-items-center justify-content-between">
                        <div><i class="fa fa-location-dot"></i> ${pendente.distancia} Km</div>
                        <div>${pendente.status? '<a href="tel:+258'+pendente.telefone+'"><i class="fa fa-phone"></i></a>': ''}</div>
                    </div>
        
                    <div class="d-flex gap-2 p-2 justify-content-start flex-column bg-light text-smart-90">
                        <div class="d-flex align-items-center small gap-2 text-smart"><i class="fa fa-location-dot"></i>${pendente.local_entrega}</div>
                        <div class="d-flex align-items-center small gap-2"><i class="fa fa-location"></i> ${pendente.local_devolucao}</div>
                    </div>
        
                </div>

                <div class="profiss-reserva-footer w-100 gap-2 d-flex justify-content-between mt-2">
                    ${pendente.is_status? `
                    <button data-pk="${pendente.pk}" class="cancelar-reserva_ btn btn-outline-danger w-100">Cancelar</buuton>
                    <button data-pk='${pendente.pk}' data-foto='${pendente.foto_perfil_cliente}' data-telefone='${pendente.telefone}' 
                    data-cliente='${pendente.nome_cliente}' data-imagem='${pendente.imagem_veiculo}' 
                    data-veiculo='${pendente.veiculo}' href='aceitar' class="aceitar-reserva_ btn bg-smart w-100">Aceitar</button>
                    `: `<span  class="btn ${pendente.bg_status} badge p-2 w-100">${pendente.status}</span>`
                    }
                </div>
                    
                </div>
                `)
                HistoricosExibidos.push(pendente.pk)
                click()
                console.log(conta++)
            });
            
        }else{
            console.log(data)
        }

    });

    
}

function click() {
    $('.aceitar-reserva_').click(function (e) {
        e.preventDefault()
        $('.historico').removeClass('open')
        var conta=0
        console.log($(this))
        var confirm=$('#rentcar-reserva-confirm')
        var pk=$(this).data('pk')
        var imagem=$(this).data('imagem')
        var veiculo=$(this).data('veiculo')
        var foto=$(this).data('foto')
        var cliente=$(this).data('cliente')
        var telefone=$(this).data('telefone')
        $('#rentcar-profiss-reserva').removeClass('open')
        confirm.addClass('open')
        confirm.html(`
        <div class="rentcar-reserva-confirm">
            <div class="confirmar-reserva">
                <div class="confirmar-img">
                    ${imagem? '<img src="'+imagem+'" alt="'+veiculo+'" >':'<span class="fa fa-car fa-1x"></span>'}
                </div>
                <div class="confirmar-titulo-veiculo">
                    <h3 class='m-0 p-0'>Confirmar reserva.</h3>
                </div>
            </div>
            <h6>${veiculo}</h6>

            <div class="confirmar-reserva mt-2">
                <div class="confirmar-img-cliente">
                    ${foto? '<img src="'+foto+'" alt="'+cliente+'" >':'<span class="fa fa-user-circle fa-2x"></span>'}
                    <div class='ms-2'><h6>${cliente}</h6></div>
                </div>
                <div>${telefone? '<a href="tel:+258'+telefone+'"><i class="fa fa-phone"></i></a>': ''}</div>
            </div>
            
            <div class="position-absolute w-100 start-0 bottom-0 d-flex gap-2">
                <button class="btn w-100 cancela">Cancelar</button>
                <button id="confirmar_" data-pk='${pk}' class=" btn bg-smart w-100 ">Confirmar</button>
            </div>
        </div>
        `)

        $('#confirmar_').click(function (e) {
            fetch('/rentcar/confirmar-reserva-pendente/'+pk+'/')
            .then(response => response.json())
            .then(data => {
                if(data.success == 'success'){
                    $('.alerta').toggleClass('open')
                    $('.alerta-successo').text(data.message).addClass('text-smart')
                    
                    $('#rentcar-reserva-confirm').toggleClass('open')
                    setTimeout(function () {
                        $('.alerta').toggleClass('open')
                        
                    },3000)
                }
                
            });
        })
        
    })

    $('.cancelar-reserva_').click(function (e) {
        e.preventDefault()
        $('.historico').toggleClass('open')
        var pk=$('.cancelar-reserva').data('pk')
        
        
    })
}

function Totalpendentes()
{
    fetch('/rentcar/total-reserva-pendente/')
    .then(response => response.json())
    .then(data => {
        $('.pendente').text(data.total)
    });

    
}


function actualizaReservas()
{
    fetch('/rentcar/obter-reserva-pendente/')
    .then(response => response.json())
    .then(data => {
        if(data.pendentes.length >0){
            const pendente_reserva=$('#reserva-pendente')
            var pk_=0
            $('#rentcar-profiss-reserva').addClass('open')
            data.pendentes.forEach(pendente => {
                pk_=pendente.pk
                pendente_reserva.html(`
                <div class="profiss-reserva shadow mb-5">
                    <div class="profiss-reserva-header">
                    <div class="profiss-reserva-profile">
                        <div class="profiss-reserva-profile-img">
                            ${pendente.foto_perfil_cliente? '<img src="'+pendente.foto_perfil_cliente+'" alt="'+pendente.nome_cliente+'" >':'<span class="fa fa-user-circle fa-2x"></span>'}
                        </div>
                        <div class="profiss-reserva-profile-nome text-break">
                            <h6 class="m-0 p-0">${pendente.nome_cliente}</h6>
                            <small class="d-flex gap-2 align-items-center text-smart"> <i class="fa fa-car text-smart-90"></i>${pendente.placa}</small>
                        </div>
                    </div>
        
                    <div class="profiss-reserva-preco rounded-2 p-2 d-flex flex-column flex-wrap shadow bg-smart">
                        <p class="preco p-0 m-0 small">${pendente.preco}</p>
                        <p class="p-0 m-0 small">Duração: ${pendente.duracao} Dia(s)</p>
                        <p class="p-0 m-0 small">Subtotal: ${pendente.preco_estimativa} MT</p>
                    </div>
                </div>
                <div class="profiss-reserva-body text-smart-90">
                    <h6 class="mt-2 px-2">${pendente.veiculo}</h6>
                    <div class="d-flex px-2 align-items-center justify-content-between">
                        <div> ${pendente.data_entrega}</div>
                        <div>-</div>
                        <div> ${pendente.data_devolucao}</div>
                    </div>

                    <div class="d-flex px-2 align-items-center justify-content-between">
                        <div><i class="fa fa-location-dot"></i> ${pendente.distancia} Km</div>
                        <div>${pendente.status? '<a href="tel:+258'+pendente.telefone+'"><i class="fa fa-phone"></i></a>': ''}</div>
                    </div>
        
                    <div class="d-flex gap-2 p-2 justify-content-start flex-column bg-light text-smart-90">
                        <div class="d-flex align-items-center small gap-2 text-smart"><i class="fa fa-location-dot"></i>${pendente.local_entrega}</div>
                        <div class="d-flex align-items-center small gap-2"><i class="fa fa-location"></i> ${pendente.local_devolucao}</div>
                    </div>
        
                </div>

                <div class="profiss-reserva-footer w-100  gap-2 d-flex justify-content-between">
                    <a href='cancelar' data-pk='${pendente.pk}' class="cancelar-reserva btn btn-outline-danger w-100">Cancelar</a>
                    <a data-pk='${pendente.pk}' data-foto='${pendente.foto_perfil_cliente}' data-telefone='${pendente.telefone}' data-cliente='${pendente.nome_cliente}' data-imagem='${pendente.imagem_veiculo}' data-veiculo='${pendente.veiculo}' href='aceitar' class="aceitar-reserva btn bg-smart w-100">Aceitar</a>
                </div>
                    
                </div>
                `)
            });
            setTimeout(lidas(pk_),10000)
        }else{
            $('#rentcar-profiss-reserva').removeClass('open')
            console.log('erro ao criar sua verificao.')
        }
        $('.aceitar-reserva').click(function (e) {
            e.preventDefault()
            var confirm=$('#rentcar-reserva-confirm')
            var pk=$('.cancelar-reserva').data('pk')
            var imagem=$('.aceitar-reserva').data('imagem')
            var veiculo=$('.aceitar-reserva').data('veiculo')
            var foto=$('.aceitar-reserva').data('foto')
            var cliente=$('.aceitar-reserva').data('cliente')
            var telefone=$('.aceitar-reserva').data('telefone')
            $('#rentcar-profiss-reserva').toggleClass('open')
            confirm.toggleClass('open')
            confirm.html(`
            <div class="rentcar-reserva-confirm">
                <div class="confirmar-reserva">
                    <div class="confirmar-img">
                        ${imagem? '<img src="'+imagem+'" alt="'+veiculo+'" >':'<span class="fa fa-car fa-1x"></span>'}
                    </div>
                    <div class="confirmar-titulo-veiculo">
                        <h3 class='m-0 p-0'>Confirmar reserva.</h3>
                    </div>
                </div>
                <h6>${veiculo}</h6>

                <div class="confirmar-reserva mt-2">
                    <div class="confirmar-img-cliente">
                        ${foto? '<img src="'+foto+'" alt="'+cliente+'" >':'<span class="fa fa-user-circle fa-2x"></span>'}
                        <div class='ms-2'><h6>${cliente}</h6></div>
                    </div>
                    <div>${telefone? '<a href="tel:+258'+telefone+'"><i class="fa fa-phone"></i></a>': ''}</div>
                </div>
                
                <div class="position-absolute w-100 start-0 bottom-0 d-flex gap-2">
                    <button class="btn w-100 cancela">Cancelar</button>
                    <button id="confirmar" data-pk='${pk}' class=" btn bg-smart w-100 ">Confirmar</button>
                </div>
            </div>
            `)

            $('#confirmar').click(function (e) {
                
                AceitarEnviar(pk)
            })

            $('.cancela').click(function (e) {
                $('#rentcar-profiss-cancelar').toggleClass('open')
                $('#rentcar-reserva-confirm').toggleClass('open')
                cancelarEnviar(pk)
            })
        })

        $('.cancelar-reserva').click(function (e) {
            e.preventDefault()
            var pk=$('.cancelar-reserva').data('pk')
            $('#rentcar-profiss-reserva').toggleClass('open')
            $('#rentcar-profiss-cancelar').toggleClass('open')
            cancelarEnviar(pk)
            
        })
    });

    
}

function lidas(pk) {
    fetch('lida-reserva-pendente/'+pk+'/')
    .then(response => response.json())
    .then(data => {
        console.log('ok')
        actualizaReservas()
    });
}

function cancelarEnviar(pk) {
    $('#cancelar').click(function () {
        var razao=$('input[name="razao"]').val()
        fetch('/rentcar/cancelar-reserva-pendente/'+pk+'/?razao='+razao)
        .then(response => response.json())
        .then(data => {
            if(data.success == 'success'){
                $('.alerta').toggleClass('open')
                $('.alerta-successo').text(data.message).addClass('text-smart')
                $('#rentcar-profiss-cancelar').removeClass('open')
                setTimeout(function () {
                    $('.alerta').toggleClass('open')
                },5000)
                $('input[name="razao"]').prop('checked', false)
            }
            
        });
    })
    $('#cancela').click(function (params) {
        $('#rentcar-profiss-reserva').toggleClass('open')
        $('#rentcar-profiss-cancelar').toggleClass('open')
    })
}

function AceitarEnviar(pk) {
    fetch('/rentcar/confirmar-reserva-pendente/'+pk+'/')
    .then(response => response.json())
    .then(data => {
        if(data.success == 'success'){
            $('.alerta').toggleClass('open')
            $('.alerta-successo').text(data.message).addClass('text-smart')
            
            $('#rentcar-reserva-confirm').toggleClass('open')
            setTimeout(function () {
                $('.alerta').toggleClass('open')
                
            },3000)

            setTimeout(function () {
                actualizaReservas()
            },4000)
            
        }
        
    });

    $('#cancela').click(function (params) {
        $('#rentcar-profiss-reserva').toggleClass('open')
        $('#rentcar-profiss-cancelar').toggleClass('open')
    })
}


function direcoesMap() {
    var map=document.getElementById('map')
    if (map) {
        // Inicializa o mapa
        map = L.map('map');


        // Tenta obter a localização do usuário
        map.locate({ setView: true, maxZoom: 55 });

        // Event listener para quando a localização é encontrada
        map.on('locationfound', function(e) {
            // Centraliza o mapa na localização do usuário
            map.setView(e.latlng, 13);

            // Obtém a latitude e longitude do evento
            var lat = e.latlng.lat.toFixed(6); // Arredonda para 6 casas decimais
            var lng = e.latlng.lng.toFixed(6);
            var img=$('#foto_user_perfil').val()
            img= img? img: $('#logotipo').val()
            // Adiciona um marcador na localização do usuário
            L.marker(e.latlng,{
                    icon: L.icon({
                        iconUrl: img,
                        iconSize: [24, 24]
                    })
                }).addTo(map)
                .bindPopup('Você está aqui!')
                .openPopup();
        });

        // Event listener para quando a localização não é encontrada
        map.on('locationerror', function(e) {
            // Inicializa o mapa com uma localização padrão se a localização não for encontrada
            map.setView([-25.9692, 32.5732], 13);
        });

        // Adiciona o tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

    }
}


function maps(params) {
    var map=document.getElementById('map')
    if (map) {
        // Inicializa o mapa
        map = L.map('map');

        // Remover controles padrão
        map.removeControl(L.control.zoom({ position: 'topright' }));
        map.removeControl(L.control.scale());
        map.removeControl(L.control.layers())
        // Adiciona e posiciona o controle de zoom
        // L.control.zoom({
        //     position: 'bottomright' // Outras opções: 'topleft', 'bottomright', 'bottomleft'
        // }).addTo(map);

        // Tenta obter a localização do usuário
        map.locate({ setView: true, maxZoom: 55 });

        // Event listener para quando a localização é encontrada
        map.on('locationfound', function(e) {
            // Centraliza o mapa na localização do usuário
            map.setView(e.latlng, 13);

            // Obtém a latitude e longitude do evento
            var lat = e.latlng.lat.toFixed(6); // Arredonda para 6 casas decimais
            var lng = e.latlng.lng.toFixed(6);
            var img=$('#foto_user_perfil').val()
            img= img? img: $('#logotipo').val()
            // Adiciona um marcador na localização do usuário
            L.marker(e.latlng,{
                    icon: L.icon({
                        iconUrl: img,
                        iconSize: [24, 24]
                    })
                }).addTo(map)
                .bindPopup('Você está aqui!')
                .openPopup();
        });

        // Event listener para quando a localização não é encontrada
        map.on('locationerror', function(e) {
            // Inicializa o mapa com uma localização padrão se a localização não for encontrada
            map.setView([-25.9692, 32.5732], 13);
        });

        // Adiciona o tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

    }
}
