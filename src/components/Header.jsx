import React from 'react';
import { MapIcon, UserIcon } from '@heroicons/react/24/outline';
import { STATE_CAPITALS } from '../data/stateCapitals';

export default function Header({ onViewportChange }) {
  const handleCitySelect = (e) => {
    const selectedCapital = STATE_CAPITALS.find(
      capital => `${capital.city}, ${capital.state}` === e.target.value
    );
    
    if (selectedCapital) {
      onViewportChange({
        latitude: selectedCapital.lat,
        longitude: selectedCapital.lng,
        zoom: 12
      });
    }
  };

  return (
    <header className="bg-blue-600 text-white h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <MapIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold">Skate Spots USA</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            onChange={handleCitySelect}
            className="px-3 py-1 rounded bg-blue-700 text-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue=""
          >
            <option value="" disabled>Select a State Capital</option>
            {STATE_CAPITALS.map(capital => (
              <option key={capital.state} value={`${capital.city}, ${capital.state}`}>
                {capital.city}, {capital.state}
              </option>
            ))}
          </select>
          <UserIcon className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
}