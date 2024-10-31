import React from 'react';
import { UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/outline';

export default function EventList({ events, userId }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isParticipating = (event) => {
    return event.participants.some(p => p.userId === userId);
  };

  return (
    <div className="p-4">
      <div className="grid gap-4">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p className="text-gray-600">{event.locationName}</p>
                <p className="text-sm text-gray-500">{event.coordinates}</p>
                <p className="text-sm text-gray-700 mt-1">{event.description}</p>
                <p className="text-sm text-blue-600">Organized by: {event.username}</p>
              </div>
              <button
                className={`flex items-center space-x-1 px-3 py-1 rounded ${
                  isParticipating(event)
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {isParticipating(event) ? (
                  <>
                    <UserMinusIcon className="h-5 w-5" />
                    <span>Leave</span>
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="h-5 w-5" />
                    <span>Join</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 pt-2 border-t">
              <p className="text-sm font-medium">Date: {formatDate(event.eventDate)}</p>
              <p className="text-sm">Skill Level: {event.skillLevel}</p>
              <p className="text-sm">
                Participants: {event.participants.length}/{event.maxParticipants}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}