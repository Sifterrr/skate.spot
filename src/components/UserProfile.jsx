import React, { useState } from 'react';
import { UserIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function UserProfile({ username, updateUsername, onToggleFriends, friendCount }) {
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsername(newUsername);
    setEditing(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <UserIcon className="h-5 w-5 text-gray-500" />
          {editing ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="px-2 py-1 border rounded"
                minLength={3}
                required
              />
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Skating as: <strong>{username}</strong></span>
              <button
                onClick={() => setEditing(true)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        
        <button
          onClick={onToggleFriends}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
        >
          <UserGroupIcon className="h-5 w-5" />
          <span>{friendCount} Friends</span>
        </button>
      </div>
    </div>
  );
}