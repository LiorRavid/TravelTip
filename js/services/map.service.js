


export const mapService = {
    initMap,
    addMarker,
    panTo,
    requestLocation,
    requestAddress,
    requestWeather
}

var gMap;
const MAP_KEY = 'mapData'

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            return gMap;
        });

}


function addMarker(loc) {
    const custom = './img/pin.png';
    var marker = new google.maps.Marker({
        position: loc,
        icon: custom,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
        // AIzaSyCR2FrNA9Lm9Y3wl05H8a8voaMYD732bNg
    const API_KEY = 'AIzaSyCR2FrNA9Lm9Y3wl05H8a8voaMYD732bNg';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function requestLocation(value) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=AIzaSyCR2FrNA9Lm9Y3wl05H8a8voaMYD732bNg`)
        .then(res => res.json())
        .then(ans => {
            console.log(ans.results[0]);
            return ans.results[0];
        })
}

function requestAddress(lat, lng) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCR2FrNA9Lm9Y3wl05H8a8voaMYD732bNg`)
        .then(res => res.json())
        .then(ans => {
            console.log(ans.results[0]);
            return ans.results[0];
        })
}

function requestWeather(lat, lng) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=f95c4d5480f7db9d35bad95632d5e467`)
        .then(res => res.json())
        .then(ans => {
            console.log(ans);
            return ans;
        })
}