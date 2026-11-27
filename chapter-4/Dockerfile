FROM node:22-alpine

WORKDIR /app/


# Este comando copia el package.json y el package-lock.json
COPY package*.json .

RUN npm install

# Se copia el resto de los archivos
COPY . . 

EXPOSE 5003

CMD ['node','./src/server.js']