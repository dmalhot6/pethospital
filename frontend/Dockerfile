FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

RUN npm install

# Create necessary directories and files if they don't exist
RUN mkdir -p public src

# Copy the rest of the application
COPY . .

# Create a basic index.html if it doesn't exist
RUN if [ ! -f public/index.html ]; then \
    echo '<!DOCTYPE html>\n\
<html lang="en">\n\
  <head>\n\
    <meta charset="utf-8" />\n\
    <meta name="viewport" content="width=device-width, initial-scale=1" />\n\
    <title>Pet Hospital</title>\n\
  </head>\n\
  <body>\n\
    <noscript>You need to enable JavaScript to run this app.</noscript>\n\
    <div id="root"></div>\n\
  </body>\n\
</html>' > public/index.html; \
  fi

# Create a basic index.js if it doesn't exist
RUN if [ ! -f src/index.js ]; then \
    echo 'import React from "react";\n\
import ReactDOM from "react-dom/client";\n\
\n\
const App = () => {\n\
  return (\n\
    <div>\n\
      <h1>Pet Hospital Management System</h1>\n\
      <p>Welcome to the Pet Hospital Management System</p>\n\
    </div>\n\
  );\n\
};\n\
\n\
const root = ReactDOM.createRoot(document.getElementById("root"));\n\
root.render(\n\
  <React.StrictMode>\n\
    <App />\n\
  </React.StrictMode>\n\
);' > src/index.js; \
  fi

# Build the application
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
