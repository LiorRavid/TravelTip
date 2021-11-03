const LOC_KEY = 'locData'

import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    removeLocation,
    addLoc,
    getLastLocation
}

var url

var locs = [
    createLoc('Greatplace', { lat: 32.047104, lng: 34.832384 }, ''),
    createLoc('Neveragain', { lat: 32.047201, lng: 34.832581 }, ''),
    createLoc('Finberg', { lat: 32.43233612843791, lng: 34.92161845083531 }, '')
]


function getLocs() {
    const locations = storageService.load(LOC_KEY) || [];
    if(locations)return Promise.resolve(locations)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function getLastLocation(){
    return saveLink(locs[locs.length-1])
}

// `https://liorravid.github.io/TravelTip/

function saveLink(loc){
    return url = `http://127.0.0.1:5501/index.html?lat=${loc.lat}&lng=${loc.lng}` 
}


function removeLocation(locName) {
    if (!locName) return;
    let locIdx = locs.findIndex(loc => loc.name === locName);
    locs.splice(locIdx, 1);
    storageService.save(LOC_KEY, locs);

}

function createLoc(name,location, weather) {
    return {
        id: _makeId(),
        name,
        lat: location.lat,
        lng: location.lng,
        weather,
        createdAt: Date.now(),
        updatedAt: ''
    };
}

function addLoc(name,location, weather) {
    console.log('name',name);
    var isLoc = locs.find((loc)=>{
        return(loc.name === name)
    })
    if(isLoc)return
    locs.push(createLoc(name,location, weather));
    storageService.save(LOC_KEY, locs);
}

function _makeId(length = 4) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}