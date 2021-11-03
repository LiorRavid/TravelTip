export const locService = {
    getLocs,
    removeLocation
}



var locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
    { name: 'Finberg', lat: 32.43233612843791, lng: 34.92161845083531 }
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