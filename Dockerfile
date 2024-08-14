# Use uma imagem base oficial do Node.js
FROM node:18

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Copie o arquivo .env para o diretório de trabalho
COPY .env .env

# Compile o TypeScript para JavaScript
RUN yarn build

# Exponha a porta que a aplicação vai rodar
EXPOSE 3000
EXPOSE 9229

# Defina o comando para iniciar a aplicação
CMD ["yarn", "start:dev"]
