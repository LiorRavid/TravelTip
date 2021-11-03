export const locService = {
    getLocs,
    removeLocation,
    addLoc
}



var locs = [
    createLoc('Greatplace', { lat: 32.047104, lng: 34.832384 }, ''),
    createLoc('Neveragain', { lat: 32.047201, lng: 34.832581 }, ''),
    createLoc('Finberg', { lat: 32.43233612843791, lng: 34.92161845083531 }, '')
]

console.log('locs', locs);

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function removeLocation(locName) {
    if (!locName) return;
    let locIdx = locs.findIndex(loc => loc.name === locName);
    locs.splice(locIdx, 1);
}

function createLoc(location, name, weather) {
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

function addLoc(location, name, weather) {
    locs.push(createLoc(location, name, weather));
    // saveToStorage(KEY, locs);
}

function _makeId(length = 4) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}