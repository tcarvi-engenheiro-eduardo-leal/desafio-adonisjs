import React from 'react';

const FavoriteButton = ({ characterId, onFavorite }) => {
  const handleFavorite = () => {
    onFavorite(characterId);
  };

  return (
    <button onClick={handleFavorite}>Favoritar</button>
  );
};

export default FavoriteButton;