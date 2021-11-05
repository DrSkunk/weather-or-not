# Weather or not

Basic web application that shows the weather forecast based on OpenWeather data.

## Installation

This requires [NodeJS](https://nodejs.org/en/) to be installed.

Clone `weather-or-not` into a directory and `cd` into it. Then run the command `npm install` to install all dependencies.

To start the application after setting the questions and the config file, run `npm start`.

- `npm run build`: Build application to static html, result will be in the `dist` folder
- `npm run serve`: Serve the application with a built-in webserver

## Config file

Copy `.env.example` to `.env.local` and fill in your details:

- `PREFIX`: The prefix for the commands.
- `DISCORD_TOKEN`: Your Discord bot token.

- `VITE_OPENWEATHER_API_KEY`: OpenWeather API key which you can request [here](https://openweathermap.org/api)
- `VITE_MAPBOX_TOKEN`: MapBox API key, your default public token when creating an account is sufficient.
- `VITE_DEFAULT_ZOOM_LEVEL`: Default zoom level on map, defaults to `13` when not set.
- `VITE_DEFAULT_SEARCH_LIMIT`: Default search result limit when searching for a location, defaults to `5` when not set.

## Development

This application is built with [Vite](https://vitejs.dev/), [Vue3](https://v3.vuejs.org/) and [TailwindCSS](https://tailwindcss.com/).

Icons used are a combination of [Heroicons](https://heroicons.com/), [Meteocons](https://basmilius.github.io/weather-icons/) and self-made icons.

The following development commands are available:

- `npm run dev`: Start development server
- `npm run lint`: Run the configured ESLint
- `npm run format`: Run the configured Prettier formatter
