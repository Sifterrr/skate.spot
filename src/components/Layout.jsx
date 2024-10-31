import React from 'react';
import Header from './Header';
import SpotMap from './SpotMap';

export default function Layout({ 
  children, 
  spots, 
  viewport, 
  onViewportChange, 
  selectedSpot, 
  onMarkerClick,
  onMapClick,
  selectedLocation 
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header onViewportChange={onViewportChange} />
      <div className="flex h-[calc(100vh-64px)]">
        <div className="w-1/2 overflow-auto">
          {children}
        </div>
        <div className="w-1/2 fixed right-0 top-16 bottom-0">
          <SpotMap
            viewport={viewport}
            onViewportChange={onViewportChange}
            spots={spots}
            selectedSpot={selectedSpot}
            onMarkerClick={onMarkerClick}
            onMapClick={onMapClick}
            selectedLocation={selectedLocation}
          />
        </div>
      </div>
    </div>
  );
}