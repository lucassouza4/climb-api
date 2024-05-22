# Node Docker Application

Este repositório contém um exemplo simples de configuração e execução de uma aplicação Node.js utilizando Docker.

## Instruções de Build

Para construir a imagem Docker da aplicação, utilize o seguinte comando:

```sh
docker build -t node-docker .
```

## Executando a Aplicação

Após construir a imagem Docker, você pode executar a aplicação utilizando um dos comandos abaixo, dependendo do seu sistema operacional e shell.

### Windows - Shell

No shell do Windows, use o seguinte comando:

```sh
docker run -v %cd%:/app -p 3000:3000 -d node-docker
```

### Windows - PowerShell

No PowerShell do Windows, use o seguinte comando:

```sh
docker run -v ${pwd}:/app -p 3000:3000 -d node-docker
```

### Linux

No Linux, use o seguinte comando:

```sh
docker run -v $(pwd):/app -p 3000:3000 -d node-docker
```

## Explicação dos Comandos

- `docker run`: Executa um contêiner Docker.
- `-v {path_local}:{path_container}`: Mapeia um volume (diretório) do sistema local para um diretório dentro do contêiner Docker.
  - No Windows Shell, `%cd%` refere-se ao diretório atual.
  - No PowerShell, `${pwd}` refere-se ao diretório atual.
  - No Linux, `$(pwd)` refere-se ao diretório atual.
- `-p {porta_host}:{porta_container}`: Mapeia uma porta do host para uma porta dentro do contêiner Docker.
  - Neste caso, mapeia a porta 3000 do host para a porta 3000 do contêiner.
- `-d`: Executa o contêiner em segundo plano (detached mode).
- `node-docker`: Nome da imagem Docker a ser executada.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Envie pull requests ou abra issues para relatar problemas e sugerir melhorias.