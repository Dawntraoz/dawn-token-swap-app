# Dawn Token swap app

A fake Token swapping interface with simulated wallet and some pools.

## Demo

Check the live site [Dawn Token swap app](https://sad-knuth-0fa4c0.netlify.app/).

| Light theme: | Dark theme: |
| ------------- | ------------- |
| ![Light theme live site screenshot](https://i.imgur.com/bNm169Ll.png) | ![Dark theme live site screenshot](https://i.imgur.com/FTyzmpyl.png) |


## Tech stack

Core - [Vue 3](https://v3.vuejs.org/) + [TypeScript](https://www.typescriptlang.org/), [Vuex 4](https://next.vuex.vuejs.org/) and [Vue Router 4](https://next.router.vuejs.org/)

Server and Builder - [Vite](https://vitejs.dev/)

Styles Utility Framework - [WindiCSS](https://windicss.org/)

Hosting - [Netlify](https://www.netlify.com/)

## Project setup

### Installation

Install dependencies

```bash
yarn install
```

### Development

Serve with hot reload at localhost:3000

```bash
yarn dev
```

### Deployment

In Netlify just add `yarn build` as the command and `dist` as the builded folder.

To test the result in your local environment, build for production and launch server with:

```bash
yarn build
yarn preview
```
