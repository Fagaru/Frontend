"use client"
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import geojsonData from "../schools-list.json"


interface MapProps {
  mapboxAccessToken: string;
}

function Map({ mapboxAccessToken }: MapProps) {
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true
    })

    
  function successLocation(position: GeolocationPosition) {
    setupMap([position.coords.longitude, position.coords.latitude]);
  }

  function errorLocation() {
    setupMap([-79.3849,43.6529])
  }

  function setupMap(center: [number, number]) {
    mapboxgl.accessToken = mapboxAccessToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/examples/clg45vm7400c501pfubolb0xz',//'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: 15
    });


    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right')

    'global MapboxDirections'

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });
  
    map.addControl(directions, 'bottom-left');

    map.on('load', () => {
      map.addLayer({
        id: 'rpd_parks',
        type: 'fill',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.3o7ubwm8'
        },
        'source-layer': 'RPD_Parks'
      });
    });

    const data = geojsonData;

    console.log(data.features[0].geometry.coordinates)

    function markersCoordinates(number_of_markers: number) {
      const markers = []
      for (let i = 0;i<number_of_markers; i++) {
        markers.push(data.features[i].geometry.coordinates)
      }
      return markers
    }

    const Markers = markersCoordinates(10)

    for (let i = 0;i<Markers.length;i++) {
      new mapboxgl.Marker({
        draggable: true
        }).setLngLat(Markers[i])
        .addTo(map);
    }

    const marker = new mapboxgl.Marker({
      draggable: true
      }).setLngLat([27.672932021393862, 85.31184012689732])
      .addTo(map);
  }

    // Clean up the map on unmount
  }, [mapboxAccessToken]);

  return <div id="map" style={{ width: '50%', height: '50%'}}></div>;
}

export default Map;
