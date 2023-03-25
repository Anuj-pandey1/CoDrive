// default map layer
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [35.791188, -78.636755],
    // center : 'Allahabad',
    zoom: 12
});
    

    function runDirection(start, end, mid1, mid2) {
        
        // recreating new map layer after removal
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);}

        function success(position)
        {
    
            console.log(position.coords.longitude + ' '+ position.coords.latitude  );
        }

        map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [35.791188, -78.636755],
            zoom: 12
        });
        
        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                start,
                mid1,
                mid2,
                end
                // end
            ]
        });

        
    

        CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'img/red.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            },

            createEndMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: 'img/blue.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            }
        });
        
        map.addLayer(new CustomRouteLayer({
            directions: dir,
            fitBounds: true
        })); 
    }

    function createMarker(start,end)
    {   
        
        
        var markerFrom = L.circleMarker(start, { color: "#F00", radius: 10 });
        var markerTo =  L.circleMarker(end, { color: "#4AFF00", radius: 10 });
        var from = markerFrom.getLatLng();
        var to = markerTo.getLatLng();
        // markerFrom.bindPopup('Delhi ' + (from).toString());
        // markerTo.bindPopup('Mumbai ' + (to).toString());
         
        map.addLayer(markerTo);
        map.addLayer(markerFrom);
        getDistance(from, to);
    }

    function getDistance(from, to)
    {
        // var container = document.getElementById('distance');
        // container.innerHTML = ("New Delhi to Mumbai - " + (from.distanceTo(to)).toFixed(0)/1000) + ' km';
        console.log((from.distanceTo(to)).toFixed(0)/1000);
    }

// function that runs when form submitted
function submitForm(event) {
    event.preventDefault();

    // delete current map layer

    map.remove();

    // getting form data
    start = document.getElementById("start").value;
    mid1 = document.getElementById("mid1").value;
    mid2 = document.getElementById("mid2").value;
    end = document.getElementById("destination").value;

    // alert('The distance between the two points is ' + distance.toFixed(2) + ' kilometers.');

    // run directions function
    runDirection(start, end,mid1,mid2);

    createMarker(start,end);
    


    // document.getElementById("form").reset();
}

// asign the form to form variable
const form = document.getElementById('form');


form.addEventListener('submit', submitForm);


map.on('click', function(e) {
    console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
});


// var searchControl =  L.control.search({
//     url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
//     jsonpParam: 'json_callback',
//     propertyName: 'allahabad',
//     markerLocation: true,
//     autoCollapse: true,
//     minLength: 2
// });
// map.addControl(searchControl);

// map.on('search:locationfound', function(e) {
//     // Get the latitude and longitude of the found location
//     var latlng = e.latlng;
//     var lat = latlng.lat;
//     var lng = latlng.lng;
//     console.log("Latitude: " + lat + ", Longitude: " + lng);
// });


var searchLayer = L.layerGroup().addTo(map); 
map.addControl( new L.Control.Search({layer: searchLayer}) );