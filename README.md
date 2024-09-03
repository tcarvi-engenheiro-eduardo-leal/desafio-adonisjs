# desafio-adonisjs

## Descrição do projeto
- Projeto fullstack WEB ainda bastante incompleto, mas com design geral terminado.
- Projeto starwars-api:
    - consulta servidor https://swapi.dev/ e recebe personagens de Star Wars.
    - Ainda falta:
        - Gravar informação de favoritos em banco de dados local redis
        - Gerar lista de personagens devido parâmetro de ter sido favoritado
        - Definir contratos mais claros entre FRONT, api-server e Back-END
        - Ainda Precisaria de 5 dias dedicados, principalmente para a análise dos contratos.
        - Também preciso de 1 dia ou mais para ajustar dependências, de forma a não haver erros devido versões do NodeJs e do AdonisJs.
## Configuração
- Há CONTRIBUTING para recriar projetos FRONT e BACK.
- Para instalação e execução, sem a recriação, siga os seguintes passos (mac):

## Configuração do ambiente de execução
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

brew install redis
redis-server

```  

## Clone do código-fonte e instalação dos projetos

```bash
git clone https://github.com/tcarvi-engenheiro-eduardo-leal/desafio-adonisjs.git
cd desafio-adonis/starwars-api
npm install
```  

```bash
cd ../starwars-front
npm install
```  

## Escreva conteúdo do arquivo .env local
```txt title="Arquivo .env"
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
```  

### Execução (não preparado para produção ainda)
- Execução local apenas
```bash
cd ..
cd starwars-api
npm run start
```  

```bash
cd ..
cd starwars-front
npm run start
```  

## Utilização
- Acesse endpoints:
    - http://127.0.0.1:3333/people
    - http://127.0.0.1:3333/people/1
    - http://127.0.0.1:3333/people/2
    - http://127.0.0.1:3333/people/3
    - http://127.0.0.1:3333/people/4
    - http://127.0.0.1:3000/
- Não terminei ainda a ligação entre o Front, o REST-API o Back, pois:
    -  passei a receber erro de CORS
    -  ainda não configurei redis local
    -  ainda não criei os modelos dos dados de Favoritos a serem gravados no banco de dados local
    -  e ainda não criei o modelo de dados final dos Personagens.
- Ainda falta muito a implementar. Comecei a implementação deste projeto na tarde de 1/09/2024.
