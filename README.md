# Glue4 Skeleton App

This is a skeleton app to make getting started with the Glue4 beta version as easy as possible and to showcase some of the core functionality.

## Getting Started

1. Run: `npm install` - to install dependencies
2. Create your local `.env` file based on `.env.example`, make sure to include `REACT_APP_ENV='dev'`
3. Run: `npx @glue4/redux init` - to setup your Glue4 API key and local config
4. Run: `npm run dev` - to start your local server and react app for glue4 development

## Deploying

Simply deploy your app (e.g. via Vercel) and make sure the env variable `REACT_APP_ENV` is set to `prod`

## How it works

Glue4 is built on top of React Redux and the Redux Toolkit, so that it may be used as a direct replacement with minimal config.

Running `npm run dev` starts up a local express server that emulates the backend. Between executions, the express server will persist everything as a file in the `./.glue4` directory.

To make auth as simple as possible, Glue4 also wraps the Auth0 provider and has pre-configured setup - you can use Auth0 throughout your application within the Glue4 store `<Provider>` component.

## Limitations

Currently, only Vercel (`https://*.vercel.app`) and GitHub page (`https://*.github.io`) domains are supported for hosting. This is a limitation of tightly coupling the OAuth provider and will be changed in future versions.

Data access and ownership is currently limited to the individual user. Customizable permissions across users are currently work in progress and will be released in the next version.

## Disclaimer

Glue4 is currently in its very early beta and not ready for production use or critical data.

## Learn More

Take a look at the [Glue4 docs](https://glue4.dev/docs) for more details and join our [Dicord]() to get direct support from the Glue4 community.
