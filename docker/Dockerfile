FROM node:14-alpine

# Install python
RUN apk add --update \
    python3 \
    python3-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
  
# Set working directory
WORKDIR /app

# Copy project file
COPY package.json .

# Install ALL node_modules, including 'devDependencies'
RUN npm install

# Copy entire project
COPY . .

EXPOSE 8080
EXPOSE 8090

ENTRYPOINT [ "node", "./bin/main.js" ]
