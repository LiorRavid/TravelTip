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

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));

    mapService.requestGeoCode();
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
            console.log('Locations:', locs)
            renderLocationTable(locs)
                // document.querySelector('.locs').innerText = JSON.stringify(locs)
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
    console.log(value);
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
    
}