## React Test

Packages
- [bootstrap 4.4](https://getbootstrap.com/): design layout
- [react-live-clock](https://github.com/pvoznyuk/react-live-clock): package for realtime clock live
- [fontawesome](https://fontawesome.com/): for icons
- [weather-icons](https://github.com/erikflowers/weather-icons): icons of weather
- [react-toastify](https://github.com/fkhadra/react-toastify): notifications
- [redux-logger](https://github.com/LogRocket/redux-logger): loggin redux
- [react-redux](https://github.com/reduxjs/redux-thunk): working with states

### Install using Docker

`user@terminal $: docker-compose up -d`

Open url `http://localhost:3001` on your browser.

### Install default

- `cp .env.example .env.development`
- `npm install` - node-13.9.0 or using **nvm** for change version of node.
- `npm start`


#### Observations
Update files `.env.development` and `.env.production` and insert **API_KEY** of `openweather`.