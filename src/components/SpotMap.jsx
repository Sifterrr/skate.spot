import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CalendarIcon, SparklesIcon } from '@heroicons/react/24/solid';

// Create custom icons for tricks and events
const createCustomIcon = (color, children) => {
  const customIcon = L.divIcon({
    className: 'custom-icon',
    html: `<div class="w-8 h-8 bg-${color}-500 rounded-full flex items-center justify-center text-white shadow-lg">
            ${children}
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
  return customIcon;
};

const trickIcon = createCustomIcon('blue', `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
    <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z" clip-rule="evenodd" />
  </svg>
`);

const eventIcon = createCustomIcon('green', `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
  </svg>
`);

const selectedLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Map view updater component
function MapUpdater({ viewport, onViewportChange }) {
  const map = useMap();

  useEffect(() => {
    map.setView([viewport.latitude, viewport.longitude], viewport.zoom);
  }, [map, viewport.latitude, viewport.longitude, viewport.zoom]);

  useEffect(() => {
    const handleMoveEnd = () => {
      const center = map.getCenter();
      onViewportChange({
        latitude: center.lat,
        longitude: center.lng,
        zoom: map.getZoom()
      });
    };

    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map, onViewportChange]);

  return null;
}

// Map click handler component
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      if (typeof onMapClick === 'function') {
        onMapClick(e);
      }
    },
  });
  return null;
}

export default function SpotMap({ 
  viewport, 
  onViewportChange, 
  spots = [], 
  onMarkerClick, 
  selectedSpot,
  onMapClick,
  selectedLocation 
}) {
  const mapRef = useRef(null);

  // Set bounds for USA
  const bounds = L.latLngBounds(
    L.latLng(24.396308, -125.000000), // Southwest coordinates
    L.latLng(49.384358, -66.934570)   // Northeast coordinates
  );

  return (
    <MapContainer
      ref={mapRef}
      center={[viewport.latitude, viewport.longitude]}
      zoom={viewport.zoom}
      style={{ width: '100%', height: '100%' }}
      zoomControl={true}
      scrollWheelZoom={true}
      maxBounds={bounds}
      minZoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapUpdater viewport={viewport} onViewportChange={onViewportChange} />
      <MapClickHandler onMapClick={onMapClick} />
      
      {Array.isArray(spots) && spots.map(spot => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          icon={spot.type === 'event' ? eventIcon : trickIcon}
          eventHandlers={{
            click: () => {
              if (typeof onMarkerClick === 'function') {
                onMarkerClick(spot);
              }
            }
          }}
        >
          {selectedSpot && selectedSpot.id === spot.id && (
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{spot.trickName || spot.title}</h3>
                <p className="text-sm">{spot.locationName}</p>
                {spot.eventDate && (
                  <p className="text-sm text-blue-600 mt-1">
                    Session: {new Date(spot.eventDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Popup>
          )}
        </Marker>
      ))}

      {selectedLocation && (
        <Marker
          position={[selectedLocation.lat, selectedLocation.lng]}
          icon={selectedLocationIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">Selected Location</h3>
              <p className="text-sm">Click the button below to add a spot here</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}