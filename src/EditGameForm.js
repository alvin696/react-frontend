import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditGameForm({ gameId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch the game data using the game ID and populate the form
    axios.get(`/api/games/${gameId}`)
      .then(response => {
        const { title, description } = response.data;
        setTitle(title);
        setDescription(description);
      })
      .catch(error => {
        console.error('Error fetching game data:', error);
      });
  }, [gameId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare the updated game data
    const updatedGame = {
      title,
      description,
    };

    // Send the PUT request to update the game
    axios.put(`/api/games/${gameId}`, updatedGame)
      .then(response => {
        console.log('Game updated successfully:', response.data);
        // Perform any additional actions or show a success message
      })
      .catch(error => {
        console.error('Error updating game:', error);
        // Handle any errors or show an error message
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Save</button>
    </form>
  );
}

export default EditGameForm;
