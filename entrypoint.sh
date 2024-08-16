#!/bin/sh

# Gere o cliente Prisma
npx prisma generate

# Cria banco
npx prisma db push --accept-data-loss

# Iniciar a aplicação
exec yarn start:dev
