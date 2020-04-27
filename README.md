This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

This would start both the node server and react client

### `npm run start-client`

This will run only the react client

### `npm run start-server`

This will run only the node server


## Mongo Database scripts

Please run these script before you run the application for the first time

## Update location in Inquizzy db

db.createCollection("inquizzy")

use inquizzy
db.locations.insert({name: "Shapoorji", latitude: "22.5692", longitude: "88.5091", city: "Kolkata", state:"West Bengal"})
db.locations.insert({name: "Saltlake", latitude: "22.5797", longitude: "88.4143", city: "Kolkata", state:"West Bengal"})

