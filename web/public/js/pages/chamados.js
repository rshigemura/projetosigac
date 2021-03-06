chamados = function () {

    var enderecosAmbulancias = [];

    var _init = function () {
        mapa.start();
        _carregarAmbulancias();
    }

    var _listarOcorrencia = function () {
        $.ajax({
            type: "GET",
            url: '/ambulancia/listar-ocorrencias',
            async: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: {status:'ABERTO'},
            success: function (data){
                var resultHtml = "";
                $('#tableOcorrencia tbody').html('');
                for (var i = 0; i < data.length; i++) {

                tr = $('<tr/>');
                tr.append("<td>"+data[i].id+"</td>");
                tr.append("<td>"+data[i].n_vitimas+"</td>");
                tr.append("<td>"+data[i].n_ambulancias_necessarias+"</td>");
                //tr.append("<td>"+_maisProxima(data[i])+"</td>");
                tr.append("<td>"+data[i].endereco+"</td>");
                
                $('#tableOcorrencia tbody').append(tr);

                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                    title: 'Ocurrence ID '+data[i].id
                });

                var infowindow = new google.maps.InfoWindow({
                    maxWidth: 250
                });
                var content = "<b>Ocurrence ID:</b> ".concat(data[i].id);

                google.maps.event.addListener(marker,'click', function(marker, content, infowindow){
                    return function() {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    };
                } (marker, content, infowindow));
                /*marker.addListener('click', function(){
                        $('#accordion .panel-collapse.collapse').collapse('hide');
                        $('#collapse'+i).collapse('show');
                });*/
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON);
            }
        });
    }
    /*
        A ideia da função abaixo é retornar o endereço de uma ambulância
        com base em sua latitude e longitude, caso esse endereço não seja
        armazenado no banco de dados. O endereço é necessário para o cálculo
        de ambulância mais próxima a uma dada ocorrência
    */
    var _enderecoLatLng = function (callback, lat, lng) {
        var latlng = {lat: lat, lng: lng};
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    callback(results[0].formatted_address);
                }
            }
            else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                setTimeout(function() {
                    _enderecoLatLng(callback, lat, lng);
                }, 200);
            }
            else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    /*
        Função que retira todos os endereços (ou latitude e longitude)
        das ambulâncias no banco de dados.
    */
    var _carregarAmbulancias = function () {

        /*$.ajax({
            type: "GET",
            url: '/ambulancia/localizacao-ambulancias',
            async: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data){
                for (var i = 0; i < 10; i++)
                {
                    if(data.length == 1 || i == 9) {
                        _enderecoLatLng(function(address) {
                            enderecosAmbulancias.push(address);
                            _listarOcorrencia();
                        }, data[i].latitude, data[i].longitude);
                    }
                    else {
                        _enderecoLatLng(function(address) {
                            enderecosAmbulancias.push(address);
                        }, data[i].latitude, data[i].longitude);
                    }
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               alert(jqXHR.responseJSON);
            }
        });*/

        enderecosAmbulancias.push("Rua H8B, 232");
        enderecosAmbulancias.push("Avenida 9 de Julho, 200");
        enderecosAmbulancias.push("R. Dr. José Cândido de Souza - Jardim Novo Mundo");
        enderecosAmbulancias.push("Av. Andrômeda - São José dos Campos");
        enderecosAmbulancias.push("Av. Silva Jardim, 340");
        _listarOcorrencia();
    }

    var _maisProxima = function (ocorrencia) {
        _ambulanciaMaisProxima(enderecosAmbulancias, ocorrencia);
    }

    var _ambulanciaMaisProxima = function (origem, ocorrencia) {
        var distanceService = new google.maps.DistanceMatrixService();
        distanceService.getDistanceMatrix({
            origins: origem,
            destinations: [ocorrencia.endereco],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            durationInTraffic: true,
            avoidHighways: false,
            avoidTolls: false
        },

        function (response, status) {
            if (status == google.maps.DistanceMatrixStatus.OVER_QUERY_LIMIT) {
                setTimeout(function() {
                    _ambulanciaMaisProxima(origem, ocorrencia);
                }, 200);
            }

            else if (status != google.maps.DistanceMatrixStatus.OK) {
                console.log('Error:', status);
            }

            else {
                console.log(response);

                var caminhos_json = response;
                var melhor_endereco = origem[0];
                var tempo_minimo = 0;
                var encontrou = false;

                for (var x = 0; x < origem.length; x++) {
                    if (caminhos_json['rows'][x]['elements'][0]['status'] == 'OK') {
                        if (encontrou == false || caminhos_json['rows'][x]['elements'][0]['duration']['value'] < tempo_minimo) {
                            tempo_minimo = caminhos_json['rows'][x]['elements'][0]['duration']['value'];
                            melhor_endereco = origem[x];
                            encontrou = true;
                        }
                    }
                }

                $("#maisProxima"+ocorrencia.id).text(melhor_endereco);
            }
        });
    }

    return{
        init: _init
    }
}();
