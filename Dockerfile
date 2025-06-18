# Usa la imagen oficial de Node.js 16 (versión Alpine para reducir tamaño)
FROM node:16-alpine

# Crea y define el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia SOLO los archivos necesarios para instalar dependencias (optimiza caché de Docker)
COPY package*.json ./

# Instala las dependencias de producción (omite devDependencies)
RUN npm install --only=production

# Copia TODO el código fuente al contenedor
COPY . .

# Expone el puerto que usa Express (3000 en tu caso)
EXPOSE 3000

# Comando para iniciar la aplicación (equivale a "npm start")
CMD ["npm", "start"]