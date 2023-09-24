"use client"
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


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
