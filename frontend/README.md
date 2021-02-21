# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Environment
- Environment variables are setup in `.env` file and needs to have the `REACT_APP_` prefix for them to be exported and usable on the frontend, currently this is where the backend url is setup.

## Caching & Performance

There are two layers of caching in the app:
1. On the static assets level, which is via the service worker to support the app being available on dodgy connections or even completely offline
2. The API data level, which is handled by apollo-client's InMemoryCache, ideally we should switch to a localStorage or indexDB solution in the future to support caching of the first requests aswell
3. JavaScript chunks are code-splitted, lazy-loaded and prefetched using webpack's dynamic imports and magic comments
4. all components are pure components via `memo`

## Deployment
- The app can be deployed to a static server after running `yarn build`
- To deploy to an s3 bucket setup for webhosting use `aws sync --delete dist/ s3://<S3_BUCKET_NAME>`
- A CloudFront distribution should be added on top of the S3 bucket as a CDN layer for scalability, caching and better availability

## TODO
- Styling / css
- Create dynamic table component to better render the results
- Enable Apollo Client's Automatic Persisted Queries on the frontend
- Proper PWA handling such as "Content cached for offline usage" message, click-to-update functionality, caching non-graphql GET requests, "user is online/offline" messages as implemented [here](https://github.com/khaledosman/create-react-pwa) or [here](https://github.com/khaledosman/wikipedia-page)
