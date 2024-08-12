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

                if (markerType === 'receber') {
                    console.log(`${suggestion.lat } - ${suggestion.lon}`)
                    console.log(`${parseFloat($('#lat').val()).toFixed(6)} - ${parseFloat($('#lng').val()).toFixed(6)}`)
                    console.log(`${$('#lat').val()} - ${$('#lng').val()}`)

                    const pointA = L.latLng(suggestion.lat , suggestion.lon);
                    const pointB = L.latLng(parseFloat($('#lat').val()), parseFloat($('#lng').val()));
                    
                    // Calcula a distância entre os pontos
                    const distancia = ((pointA.distanceTo(pointB))/1000).toFixed(2); // Distância em metros
                    $('#distancia').val(distancia)

                    $('#coordenadas_entregas').val(suggestion.lat +',' +suggestion.lon)
                }else{
                    $('#coordenadas_devolucao').val(suggestion.lat +',' +suggestion.lon)
                }
                
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

