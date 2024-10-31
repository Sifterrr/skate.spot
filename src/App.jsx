import React, { useState } from 'react';
import Layout from './components/Layout';
import TabView from './components/TabView';
import TrickList from './components/tricks/TrickList';
import EventList from './components/events/EventList';
import AddTrickForm from './components/tricks/AddTrickForm';
import AddEventForm from './components/events/AddEventForm';
import UserProfile from './components/UserProfile';
import FriendsList from './components/friends/FriendsList';
import { INITIAL_TRICKS, INITIAL_EVENTS } from './data/initialData';
import { INITIAL_FRIENDS } from './data/friendsData';

function App() {
  const [activeTab, setActiveTab] = useState('tricks');
  const [tricks, setTricks] = useState(INITIAL_TRICKS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [viewport, setViewport] = useState({
    latitude: 39.8283, // Center of USA
    longitude: -98.5795,
    zoom: 4
  });
  const [showAddTrick, setShowAddTrick] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [userId] = useState('user-1');
  const [username, setUsername] = useState('Skater');
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [showFriends, setShowFriends] = useState(false);

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const handleMapClick = (event) => {
    if (!showAddTrick && !showAddEvent) {
      setSelectedLocation({
        lat: event.latlng.lat,
        lng: event.latlng.lng
      });
    }
  };

  const handleAddTrick = async (formData) => {
    if (!selectedLocation) return;

    const newTrick = {
      id: Date.now().toString(),
      type: 'trick',
      trickName: formData.trickName,
      locationName: formData.locationName,
      description: formData.description,
      photoUrl: 'https://placehold.co/300x300',
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      coordinates: `${selectedLocation.lat.toFixed(4)}°N, ${selectedLocation.lng.toFixed(4)}°W`,
      userId,
      username,
      tries: formData.tries,
      stance: formData.stance,
      setup: formData.setup,
      createdAt: new Date().toISOString()
    };

    setTricks(prev => [newTrick, ...prev]);
    setShowAddTrick(false);
    setSelectedLocation(null);
  };

  const handleAddEvent = async (formData) => {
    if (!selectedLocation) return;

    const newEvent = {
      id: Date.now().toString(),
      type: 'event',
      title: formData.title,
      locationName: formData.locationName,
      description: formData.description,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      coordinates: `${selectedLocation.lat.toFixed(4)}°N, ${selectedLocation.lng.toFixed(4)}°W`,
      userId,
      username,
      eventDate: formData.eventDate,
      skillLevel: formData.skillLevel,
      maxParticipants: formData.maxParticipants,
      participants: [{ userId, username }],
      createdAt: new Date().toISOString()
    };

    setEvents(prev => [newEvent, ...prev]);
    setShowAddEvent(false);
    setSelectedLocation(null);
  };

  const handleMarkerClick = (spot) => {
    setSelectedSpot(spot);
    setSelectedLocation(null);
  };

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const handleAddFriend = (newFriend) => {
    if (!friends.find(f => f.userId === newFriend.userId)) {
      setFriends(prev => [...prev, newFriend]);
    }
  };

  const handleRemoveFriend = (friendId) => {
    setFriends(prev => prev.filter(friend => friend.userId !== friendId));
  };

  const spots = activeTab === 'tricks' ? tricks : events;

  return (
    <Layout 
      spots={spots}
      viewport={viewport} 
      onViewportChange={handleViewportChange}
      selectedSpot={selectedSpot}
      onMarkerClick={handleMarkerClick}
      onMapClick={handleMapClick}
      selectedLocation={selectedLocation}
    >
      <UserProfile 
        username={username} 
        updateUsername={updateUsername}
        onToggleFriends={() => setShowFriends(!showFriends)}
        friendCount={friends.length}
      />
      
      {showFriends && (
        <FriendsList
          friends={friends}
          onClose={() => setShowFriends(false)}
          onAddFriend={handleAddFriend}
          onRemoveFriend={handleRemoveFriend}
        />
      )}

      <TabView activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'tricks' ? (
        <>
          <TrickList tricks={tricks} />
          {selectedLocation && (
            <div className="fixed bottom-6 left-6 space-x-2">
              <button
                onClick={() => setShowAddTrick(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              >
                Add Trick Here
              </button>
              <button
                onClick={() => setSelectedLocation(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
          {showAddTrick && (
            <AddTrickForm
              onSubmit={handleAddTrick}
              onCancel={() => {
                setShowAddTrick(false);
                setSelectedLocation(null);
              }}
            />
          )}
        </>
      ) : (
        <>
          <EventList events={events} userId={userId} />
          {selectedLocation && (
            <div className="fixed bottom-6 left-6 space-x-2">
              <button
                onClick={() => setShowAddEvent(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              >
                Add Skate Date Here
              </button>
              <button
                onClick={() => setSelectedLocation(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
          {showAddEvent && (
            <AddEventForm
              onSubmit={handleAddEvent}
              onCancel={() => {
                setShowAddEvent(false);
                setSelectedLocation(null);
              }}
            />
          )}
        </>
      )}
    </Layout>
  );
}

export default App;