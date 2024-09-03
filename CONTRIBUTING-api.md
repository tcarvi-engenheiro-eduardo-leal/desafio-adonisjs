# Adonis Js

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

## Criar projeto AdonisJS para back-end
```bash
adonis new starwars-api --api-only
```  

## Entre no diretório do projeto
```bash
cd starwars-api
```  

## Instale dependências
```bash  
npm install ioredis @adonisjs/redis axios
```  

## Criar controller para consulta de People
```bash
adonis make:controller People
```

```bash
touch app/Controllers/Http/PeopleController.js
```

```javascript title="app/Controllers/Http/PeopleController.js"
'use strict'

const axios = require('axios')
const Redis = require('./redis-client')

class PeopleController {

  async index({ response }) {
    try {
      const { data } = await axios.get('https://swapi.dev/api/people/')
      return response.json(data)
    } catch (error) {
      return response.status(500).json({ error: 'Unable to fetch data from Star Wars API' })
    }
  }

  async show({ params, response }) {
    try {
      const { data } = await axios.get(`https://swapi.dev/api/people/${params.id}/`)
      return response.json(data)
    } catch (error) {
      return response.status(500).json({ error: 'Unable to fetch data from Star Wars API' })
    }
  }

  async search({ request, response }) {
    try {
      const { name } = request.qs()  // Obtém o parâmetro 'name' da query string
      const { data } = await axios.get(`https://swapi.dev/api/people/?search=${name}`) // Usa o parâmetro 'search' para buscar pelo nome
      return response.json(data)
    } catch (error) {
      return response.status(500).json({ error: 'Unable to search data from Star Wars API' })
    }
  }

  async favorite({ params, response }) {
    try {
      const { id } = params
      const key = `favorite:${id}`

      // Fetch the character data from the Star Wars API
      const { data } = await axios.get(`https://swapi.dev/api/people/${id}/`)

      // Save to Redis
      await Redis.set(key, JSON.stringify(data))

      return response.json({ message: 'Character added to favorites', data })
    } catch (error) {
      return response.status(500).json({ error: 'Unable to add character to favorites' })
    }
  }

  async getFavorites({ response }) {
    try {
      const keys = await Redis.keys('favorite:*')
      const favorites = await Promise.all(keys.map(async (key) => {
        const data = await Redis.get(key)
        return JSON.parse(data)
      }))
      return response.json(favorites)
    } catch (error) {
      return response.status(500).json({ error: 'Unable to fetch favorite characters' })
    }
  }
}

module.exports = PeopleController
```

## Crie o arquivo app/Controller/Http/redis-client.js e adicione a seguinte configuração:
```bash
mkdir -p app/Controller/Http
```

```bash
touch app/Controller/Http/redis-client.js
```

```javascript
'use strict'

const Redis = require('ioredis')
const Env = use('Env')

const redis = new Redis({
  host: Env.get('REDIS_HOST', '127.0.0.1'),
  port: Env.get('REDIS_PORT', 6379),
  password: Env.get('REDIS_PASSWORD', null),
})

module.exports = redis
```


## Edite o arquivo .env para usar o banco de dados in-memory redis:
```txt
HOST=127.0.0.1
PORT=3333
NODE_ENV=development
CACHE_VIEWS=false
APP_KEY=2zeXdXgCMMvnoxY6JWylsoxl8aY3s63Q
DB_HOST=127.0.0.1
HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=

# Configurações do Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Configurações do aplicativo
APP_NAME=starwars-api
APP_ENV=development
APP_URL=http://localhost:3333
APP_PORT=3333

# Configurações do banco de dados
DB_CONNECTION=sqlite
DB_DATABASE=adonis

# Configurações de segurança
HASHING_DRIVER=bcrypt

# Outros parâmetros de configuração (se necessário)
```

# Gere APP_KEY aleatória para sua aplicação, no arquivo .env
```bash
adonis key:generate
```  

## Banco de dados redis no ambiente local
- Você precisará configurar um banco de dados redis localmente.
```bash
brew install redis
redis-server
```  

## Acrescente as seguintes rotas em start/routes.js
```bash
Route.get('people', 'PeopleController.index')
Route.get('people/:id', 'PeopleController.show')
Route.get('/people/search', 'PeopleController.search')
Route.post('people/:id/favorite', 'PeopleController.favorite')
Route.get('people/favorites', 'PeopleController.getFavorites')
```

## Para o caso de erro em dependências
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## Executar projeto, em seu diretório

```bash
npm run start
```  

## Garantir correção e qualidade do design do código
### Runs ESLint
```bash
npm run lint
``` 

### Run ESLint and auto-fix issues
```bash
npm run lint -- --fix
```  

### Runs prettier
```bash
npm run format
``` 
