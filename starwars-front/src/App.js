import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import FavoriteButton from './components/FavoriteButton';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Função para buscar personagens pelo nome
  const searchCharacters = async (name) => {
    try {
      const response = await axios.get(`http://localhost:3333/people/search?name=${name}`);
      setCharacters(response.data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  // Função para adicionar personagem aos favoritos
  const addToFavorites = async (characterId) => {
    try {
      const response = await axios.post(`http://localhost:3333/people/${characterId}/favorite`);
      if (response.data.message === 'Character added to favorites') {
        alert('Character added to favorites!');
        fetchFavorites();
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  // Função para buscar os favoritos do servidor
  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:3333/people/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // Carregar favoritos ao montar o componente
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="App">
      <h1>Personagens de Star Wars</h1>
      <SearchBar onSearch={searchCharacters} />

      <h2>Retorno da Pesquisa:</h2>
      {characters.map((character) => (
        <div key={character.url}>
          <p>{character.name}</p>
          <FavoriteButton characterId={character.url.split('/').slice(-2, -1)[0]} onFavorite={addToFavorites} />
        </div>
      ))}

      <h2>Favoritos:</h2>
      {favorites.map((favorite) => (
        <div key={favorite.url}>
          <p>{favorite.name}</p>
        </div>
      ))}
    </div>
  );
};

export default App;