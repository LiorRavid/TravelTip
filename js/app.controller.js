import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onSearch = onSearch;
window.onGoLocation = onGoLocation;
window.onDeleteLocation = onDeleteLocation;
window.onCopyLocation = onCopyLocation;
window.goToInitMap = goToInitMap;


function onInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const latParam = urlParams.get('lat')
    const lngParam = urlParams.get('lng')
    if(!latParam) goToInitMap(undefined,undefined)
    else goToInitMap(+latParam , +lngParam)
}

function goToInitMap(lat,lng){
    mapService.initMap(lat , lng)
    .then(() => {
        console.log('Map is ready');
    })
    .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('locs',locs);
            renderLocationTable(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.panTo(pos.coords.latitude, pos.coords.longitude);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}


function onSearch() {
    let value = document.querySelector('.search-bar input').value
    mapService.requestLocation(value).then(renderLocation);
}

function renderLocationTable(locations) {
    var strHtmls = locations.map((location) => {
        return `<tr>
        <td class="${location.name}">${location.name}</td>
        <td class= "actions-container">
        <button class= "action-btn go-btn" onclick= "onGoLocation(${location.lat},${location.lng})">Go</button>
        <button class= "action-btn delete-btn" onclick = "onDeleteLocation('${location.name}')">Delete</button> 
        </tr>`
    });

    document.querySelector('.locations-content').innerHTML = strHtmls.join('')
}

function onGoLocation(locLat, locLng) {
    mapService.panTo(locLat, locLng)
}

function onDeleteLocation(locName) {
    console.log('delete');
    locService.removeLocation(locName)
    locService.getLocs()
        .then(locs => {
            renderLocationTable(locs)
        })
}

function onCopyLocation(){
    const copyUrl = locService.getLastLocation()
    var currHref = document.querySelector('.copied-url')
    currHref.setAttribute('href', copyUrl);
    document.querySelector('.copied-url').innerText = copyUrl ;
}

function renderLocation(result) {
    let name = result.formatted_address;
    let location = result.geometry.location;
    mapService.panTo(location.lat, location.lng);
    console.log(name);
    locService.addLoc(name,location, '');
    onGetLocs()
}