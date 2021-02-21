# Serverless Lambdas

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/)

## Features / Tools

1. VSCode debugger setup at `.vscode/launch.json` with serverless-offline, just press f5 to start a local server and inspect break points
1. Apollo-Server v2 setup for an AWS Lambda
1. Caching GraphQL Responses in memory or redis
1. MongoDB/Mongoose integration & Caching connections outside of lambda handler
1. Serverless setup for different environments & deployment targets
1. serverless-warmup plugin integration to reduce cold starts possibility and keep the lambdas warm
1. Semantic-versioning, changelog generation and automated releases thanks to semantic-release
1. Linting with StandardJS
1. Gzip compression
1. Environment variables per stage can be defined in an `env.yml` file
1. AWS X-Ray integration for traces
1. GraphQL Playground integration w/ traces
1. Apollo Engine/Graph Manager integration for monitoring
1. Serverless Dashboard monitoring


## Running the server

- install the dependencies using `yarn`
- use `yarn start` to run the server locally

## Environment variables

- environment variables can be setup in `env.yml` file where you can set different variable values for each aws stage / environment

## Caching & Performance

- The server utilizes apollo-server's cache capabilities to enable Automatic Persisted Queries as well as caching on the Schema level via redis, all graphql queries and their responses are therefore cached with a preset expiration time.
- The default setup uses a free redis cluster hosted on redislabs, redsmin.com can be used as a GUI around redis to view what's in the cache
- The typescript serverless template is optimised for minimum bundle size & build speed via webpack and yarn as explained in details [here](https://itnext.io/how-to-optimise-your-serverless-typescript-webpack-eslint-setup-for-performance-86d052284505)
- Serverless-plugin-warmup is added to keep the lambda warm and minimise potential coldstart penalties

## Deployment

The app can be hosted on AWS Lambdas + APIGateway, all the necessary cloudformation setup is already handled in the `serverless.yml` file
- Setup your aws credentials and aws profile using `aws configure --profile <aws_profile>`
- `npm install`
- `yarn deploy:dev` to deploy dev environment
- `yarn deploy:live` to deploy to live

## TODO

1. Add some lambdas to fetch the blocks periodically and store it in the mongo database
2. Let the resolvers fetch the data from the database if exists instead of going to the API everytime (when the redis graphql cache expires)
3. Using the mongo database will allow us to fetch only the requested fields from the database using `getMongooseSelectionFromFields` helper function, as opposed to curently fetching and downloading everything from the API which will provide a massive performance win as explained [here](https://itnext.io/graphql-performance-tip-database-projection-82795e434b44)

## Releasing

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release), [commitizen](https://github.com/commitizen/cz-cli), [commitlint](http://commitlint.js.org), [husky](https://github.com/typicode/husky) and [conventional commits](https://conventionalcommits.org/en/v1.0.0-beta.4/) in order to automate the release proccess

### Setup/Prequisites

1. The user needs to have a `GH_TOKEN` environment variable set with a valid git token that has push access to the repository which can be generated following these [steps](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
2. the token can be added into a `~/.bash_profile` to avoid manually setting it before running the command.
3. The script should be run from the release branch only (default: master) otherwise it will fail. To change the release branch you can edit the "release" section in the `package.json` file to temporarily set the release branch as follows
  
```js
"release": {
  ...
  "branch": "feature/integrate-semantic-release"
  ...
}
```

### Usage

- `yarn commit` will run commitizen cli to generate a conventional style commit message
- `yarn release` will do a dry-run of the release without pushing or changing any files
- `yarn release --no-ci` will do a real release.
We could potentially use this to automate releases when new commits/PRs land in the master branch
Details

### A release will

- Bump the version in `package.json` according to semantic versioning (semver) based on the changes/commit messages (fix/perf = patch, feat = minor, breaking = major)
- Create a git tag
- Generate a CHANGELOG.md with the latest changes since the last release
- Push the changes to the repository & create a git release
