import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateGameStatus({ gameId }) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch the game data using the game ID and populate the form
    axios.get(`/api/games/${gameId}`)
      .then(response => {
        const { status } = response.data;
        setStatus(status);
      })
      .catch(error => {
        console.error('Error fetching game data:', error);
      });
  }, [gameId]);

  const handleStatusChange = () => {
    // Prepare the updated game data
    const updatedGame = {
      status: status === 'active' ? 'inactive' : 'active',
    };

    // Send the PATCH request to update the game status
    axios.patch(`/api/games/${gameId}`, updatedGame)
      .then(response => {
        console.log('Game status updated successfully:', response.data);
        // Perform any additional actions or show a success message
      })
      .catch(error => {
        console.error('Error updating game status:', error);
        // Handle any errors or show an error message
      });
  };

  return (
    <div>
      <p>Status: {status}</p>
      <button onClick={handleStatusChange}>Toggle Status</button>
    </div>
  );
}

export default UpdateGameStatus;
