# Dockerfile
FROM ghcr.io/puppeteer/puppeteer:21.7.0

# Defina as variáveis de ambiente
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# Create working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Expose port
EXPOSE 4000

# Start the app
CMD ["node", "index.js"]