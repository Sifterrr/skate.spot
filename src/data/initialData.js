export const INITIAL_TRICKS = [
  {
    id: '1',
    type: 'trick',
    trickName: '360 Flip',
    locationName: 'Venice Beach Skatepark',
    description: 'Historic beachfront skatepark, smooth concrete',
    coordinates: '33.9850°N, 118.4695°W',
    photoUrl: 'https://placehold.co/300x300',
    lat: 33.9850,
    lng: -118.4695,
    userId: 'system',
    username: 'SkateSpots',
    tries: 3,
    stance: 'regular',
    setup: {
      deck: 'Baker',
      trucks: 'Independent',
      wheels: 'Spitfire'
    }
  }
];

export const INITIAL_EVENTS = [
  {
    id: '1',
    type: 'event',
    title: 'Weekend Skate Session',
    locationName: 'Stoner Skate Plaza',
    description: 'All skill levels welcome! Come learn and share tricks.',
    coordinates: '34.0369°N, 118.4529°W',
    lat: 34.0369,
    lng: -118.4529,
    userId: 'system',
    username: 'SkateSpots',
    eventDate: '2024-02-10T14:00',
    skillLevel: 'all',
    maxParticipants: 10,
    participants: [
      { userId: 'system', username: 'SkateSpots' }
    ]
  }
];