mapboxgl.accessToken = 'pk.eyJ1Ijoid2Vyd2VyMTciLCJhIjoiY2twbXZoZWNuMDYzaTJubnUyd2NmOXJidCJ9.thPscesMANS5mHnYfA6aAw';
// it is our key in the mapbox website it is unique for us

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true // third one is optional
})

function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude])
    // we have to write longitude first. it is sthng with mapbox !!
}

function errorLocation() {
setupMap([ 27.532683372024152 , 41.019545547100876]) // TEKİRDAĞ We have to first write longitude then latitude otherwise 
// we will get falsy values
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',  // div id in the html
        style: 'mapbox://styles/mapbox/streets-v11', // to see the streets we use streets-v11
        center: center,
        zoom:10 /* it is the first opening scale of map
        if you set it to 1 you will see whole earth map */ 
    });
 
    const nav = new mapboxgl.NavigationControl(); // This is a   +/-    menu 
    map.addControl(nav, 'top-left') // bye default it is at he top right

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric'
      });  
      map.addControl(directions, 'top-right'); 



document.getElementById('fit').addEventListener('click', function () {
    map.fitBounds([
    [32.837716, 39.925039], // southwestern corner of the bounds
    [32.836120, 39.925039] // northeastern corner of the bounds
    ]),
    setTimeout(() => window.open('https://www.anitkabir.tsk.tr/index.html'), 20000) 
    // This is the page will be opened after the button clicked  
});


map.on('load', function () {
    // Load an image from an external URL.
    map.loadImage(
    'https://upload.wikimedia.org/wikipedia/commons/a/a8/Ataturk1930s.jpg',
    function (error, image) {
    if (error) throw error;
     
    // Add the image to the map style.
    map.addImage('ata', image);
     
    // Add a data source containing one point feature.
    map.addSource('point', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [32.8371,39.925040] // image coordinates on map
    }
    }
    ]
    }
    });
     
    // Add a layer to use the image to represent the data.
    map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'point', // reference the data source
    'layout': {
    'icon-image': 'ata', // reference the image
    'icon-size': 0.18
    }
    });
    }
    );
    });

}
