# Toit package server

This repository contains the web-page that is served on https://pkg.toit.io.

The server, using this web-page, is located at https://github.com/toitware/tpkg.

# Setup for development

## Node version

This project doesn't compile anymore with recent node versions. Use,
for example, `nvm` to install an older version of node. The repository
contains a `.nvmrc` file that specifies the node version that works.

If you have nvm installed, but not automatically activated in your
.bashrc, you will need to do

```bash
source /usr/share/nvm/init-nvm.sh
```

Then run `nvm install` to install the correct version of node.

## yarn

`yarn` is used in web projects. To install `yarn`, follow the guide [here](https://yarnpkg.com/lang/en/docs/install/#debian-stable).

Note! You don't need to setup your `PATH` env.var. as described in the guide.

If you haven't installed `node` yet, install `node` from [nodejs.org](https://nodejs.org/en/). Add the node bin directory to your `PATH` in `$HOME/.profile`

The version of `node` must be >= v12.16.1, i.e. the version of node that comes with yarn is not the latest.

* * *

In order to be able to install packages from this repository on your machine,
you need to [authenticate with the GitHub
registry](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages).

Here's a short summary of what you need to do:

1. [Create a personal access token](https://github.com/settings/tokens/new)
   1. Name it appropriately
   2. Check `write:packages` and `read:packages`
2. Copy the token
3. Add the token to your `~/.npmrc`:
   `echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc`

## Linting and imports in VS Code

- Add the ESLint extension to VS Code to get linting directly in the code. https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint.
- To get the right indentation, etc. directly in the code, and on save add the Prettier extension to VS Code. https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode.
- To get VS Code to automatically fix linting errors (if possible) and organize imports on save, add the following to your settings.json file:

        "editor.codeActionsOnSave": [
          "source.organizeImports",
          "source.fixAll.eslint"
        ],

## Useful developer tools

- [React developer tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Redux developer tools for Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?Itemid=1027)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
