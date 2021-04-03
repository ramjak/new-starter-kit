## Because of mock api that I am using, this web will only work on firefox


This project was created with [Create React App](https://github.com/facebookincubator/create-react-app)

In case build fail, try: `npm rebuild node-sass`

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Getting Started
### Requirement:
- Node ^8.11

### Installing
- run `yarn install` in the folder repository
- run `yarn start` or `npm start` to start the app
- open `localhost:3000` in a browser to open the webapp

### Development

The main goal of current architecture is to increase reusability and adaptibility of project components. So they can also be used even without React as core.

#### Src Folder structure
```
src/
  /assets --- general asset of the project except /assets/_project-variables.scss
  /context --- global interface
  /project_assets --- theme spesific asset
  /service --- stateful global object
  /component* --- react presentational component
  /container* --- react container component
  /data* --- global data management related files (for redux: actions, reducer)
  /utils* --- stateless helper, pure function only
  /modules --- isolated entity related folder, can be consist of *-marked folder
```

#### .editorconfig
This project using .editorconfig for various typing configurations. Be sure to use editor that support it.

#### Linter
This project have 2 linter configuration: [one for development](./tslint.json) and [one for commit hook](./tslint.precommit.json) which inspect the working files before the commit happened.
Development linter is less strict than the commit one. The main purpose of it is to assist developer with logical error in the working code, and to not disturb the developer with warning of the experimental code which might not make it to the repository.
On other hand, the commit linter is there to enforce bad coding practice and help readability of the code to help other developers understand the code better.

If your commit is canceled because of linter error, fix it and commit again. **Never force commit and skip the linter error unless in critical situation**. Doing that will only postpone the error to the next developer who editted the code later. Discuss with the team if you think there is a rule which is not needed or obsolete.

#### Overwriting library files
You can use the `\temp` folder for overwriting certain file in node_modules folder. By creating a file which has exact name and relative path to node_modules. It will be replaced once you run install command, `yarn install`.
