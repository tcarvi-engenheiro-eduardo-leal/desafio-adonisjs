# projeto React

## Gere novo projeto igual, usando linha de comando e com versões atualizadas das dependências

### Instalação do ambiente (nvm, node e npm), usando mac
```bash  
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# nvm version
nvm -v # should print `0.40.0`

# download and install Node.js (you may need to restart the terminal)
nvm install 20

# verifies the right Node.js version is in the environment
node -v # should print `v20.17.0`

# verifies the right npm version is in the environment
npm -v # should print `10.8.2`

npm install -g @adonisjs/cli
```  

## Criar projeto
```bash
npx create-react-app starwars-front
``` 

```bash
cd starwars-front
``` 

## Instale dependência adicional
```bash  
npm install axios
```  

## Crie componentes para Favoritar e para Pesquisar por nome 

```bash
touch components/FavoriteButton.js
```  

```bash
touch components/SearchBar.js
```  

## Use o seguinte código para o componente FavoriteButton.js
```javascript title="components/FavoriteButton.js" 
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
```

## Use o seguinte código para o componente SearchBar.js
```javascript title="components/SearchBar.js" 
import React, { useState } from 'react';
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a character"
      />
      <button onClick={handleSearch}>Procurar</button>
    </div>
  );
};
export default SearchBar;
```

## Inclua os componentes em App.js
```Javascript
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

      <h2>Lista de Personagens</h2>
      {characters.map((character) => (
        <div key={character.url}>
          <p>{character.name}</p>
          <FavoriteButton characterId={character.url.split('/').slice(-2, -1)[0]} onFavorite={addToFavorites} />
        </div>
      ))}
      <h2>Favoritados</h2>
      {favorites.map((favorite) => (
        <div key={favorite.url}>
          <p>{favorite.name}</p>
        </div>
      ))}
    </div>
  );
};
export default App;
```  
