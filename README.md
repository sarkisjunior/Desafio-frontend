Rode os comandos no terminal com o docker instalado

docker build -t frontend-app . 

docker run -d -p 3001:3001 -p 3000:3000 frontend-app

seu backend estará rodando em 'http://localhost:3001/'