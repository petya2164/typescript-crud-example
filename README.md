This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Splitting a WebApp into multiple layers has some advantages:

* a better separation of concerns
* the layer implementation can be replaced
* the UI layer can be hard to test. By moving the logic to other layers,
  it becomes easier to test.

This WebApp can store and access data in 2 separate "backends":

1. The browser's LocalStorage (default option)
2. REST API (serving dummy_data/db.json via json-server)

## Quick start

After cloning the repo, you can either use Yarn (faster) or NPM (old-school).

### Yarn

```bash
# Install dependencies
yarn

# Serve the site on localhost:3000
yarn start

# In a second terminal, start the json-server (only needed for the REST API backend)
yarn server
```

### NPM

```bash
# Install dependencies
npm install

# Serve the site on localhost:3000
npm start

# In a second terminal, start the json-server (only needed for the REST API backend)
npm run server
```

