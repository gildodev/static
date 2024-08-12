// Inicializa o mapa
var map = L.map('map');

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

// Inicializando o marcador
var startMarker, endMarker;

// Função para buscar sugestões de localização
function fetchSuggestions(query, callback) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycode=MZ`)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Erro ao buscar sugestões:', error);
        });
}

// Função para atualizar a lista de sugestões
function updateSuggestions(suggestions, containerId, markerType) {
    var suggestionsContainer = document.getElementById(containerId);
    suggestionsContainer.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(function(suggestion) {
            var div = document.createElement('div');
            div.className = 'autocomplete-suggestion';
            div.innerText = suggestion.display_name;
            div.addEventListener('click', function() {
                document.getElementById(markerType).value = suggestion.display_name;
                
                var latlng = [suggestion.lat, suggestion.lon];
                
                if (markerType === 'receber') {
                    $('#coordenadas_entregas').val(suggestion.lat +',' +suggestion.lon)

                    if (startMarker) {
                        
                        startMarker.setLatLng(latlng).bindPopup(suggestion.display_name).openPopup();
                    } else {
                        
                        startMarker = L.marker(latlng).addTo(map).bindPopup(suggestion.display_name).openPopup();;
                    }
                }else{
                    $('#coordenadas_devolucao').val(suggestion.lat +',' +suggestion.lon)
                    if (endMarker) {
                        
                        endMarker.setLatLng(latlng).bindPopup(suggestion.display_name).openPopup();;
                    } else {
                        endMarker = L.marker(latlng).addTo(map).bindPopup(suggestion.display_name).openPopup();;
                    }
                }
                
                map.setView(latlng, 13);
                suggestionsContainer.innerHTML = '';
                
            });
            suggestionsContainer.appendChild(div);
        });
    } else {
        var div = document.createElement('div');
        div.className = 'autocomplete-suggestion d-flex';
        div.innerHTML = '<small class="text-smart"> Procurando...</small>';
        suggestionsContainer.appendChild(div);
    }
}

// Manipuladores de eventos de input para buscar sugestões
document.getElementById('receber').addEventListener('input', function() {
    var query = this.value;
    if (query.length > 2) {
        fetchSuggestions(query, function(suggestions) {
            updateSuggestions(suggestions, 'startSuggestions', 'receber');
        });
    } else {
        document.getElementById('startSuggestions').innerHTML = '';
    }
});

document.getElementById('devolucao').addEventListener('input', function() {
    var query = this.value;
    if (query.length > 2) {
        fetchSuggestions(query, function(suggestions) {
            updateSuggestions(suggestions, 'endSuggestions', 'devolucao');
        });
    } else {
        document.getElementById('endSuggestions').innerHTML = '';
    }
});

// Adiciona o tile layer

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);
