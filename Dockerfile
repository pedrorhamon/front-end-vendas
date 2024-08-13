# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código fonte do projeto para o container
COPY . .

# Build da aplicação Angular
RUN npm run build --prod

# Stage 2: Run the Angular application
FROM nginx:alpine

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia os arquivos compilados da fase de build para o diretório padrão do Nginx
COPY --from=build /app/dist/vendas-front /usr/share/nginx/html/vendas-front

# Move o conteúdo da pasta browser para o diretório raiz
RUN mv /usr/share/nginx/html/vendas-front/browser/* /usr/share/nginx/html/vendas-front/ && \
    rmdir /usr/share/nginx/html/vendas-front/browser

# Expõe a porta 80 para acesso externo
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
