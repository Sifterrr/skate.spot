import React from 'react';

export default function TrickList({ tricks }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4">
      <div className="grid gap-4">
        {tricks.map(trick => (
          <div key={trick.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-4">
              <img
                src={trick.photoUrl}
                alt={trick.trickName}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{trick.trickName}</h2>
                <p className="text-gray-600">{trick.locationName}</p>
                <p className="text-sm text-gray-500">{trick.coordinates}</p>
                <p className="text-sm text-gray-700 mt-1">{trick.description}</p>
                <p className="text-sm text-blue-600">Added by: {trick.username}</p>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t">
              <p className="text-sm">Tries: {trick.tries}</p>
              <p className="text-sm">Stance: {trick.stance}</p>
              {trick.setup && (
                <div className="text-sm">
                  <p>Setup:</p>
                  <ul className="list-disc list-inside pl-2">
                    {trick.setup.deck && <li>Deck: {trick.setup.deck}</li>}
                    {trick.setup.trucks && <li>Trucks: {trick.setup.trucks}</li>}
                    {trick.setup.wheels && <li>Wheels: {trick.setup.wheels}</li>}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}