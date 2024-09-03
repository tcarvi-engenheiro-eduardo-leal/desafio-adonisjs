// src/components/FavoriteButton.js
import React from 'react';

const FavoriteButton = ({ characterId, onFavorite }) => {
  const handleFavorite = () => {
    onFavorite(characterId);
  };

  return (
    <button onClick={handleFavorite}>Add to Favorites</button>
  );
};

export default FavoriteButton;