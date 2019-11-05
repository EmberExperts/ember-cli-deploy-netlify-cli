# ember-cli-deploy-netlify-cli

Integrate your deploy pipeline with netlify manual deploys using netlify-cli.


# Compatibility

* ember-cli-deploy v1.0 or above
* Node.js v8 or above


## Installation

```
ember install ember-cli-deploy-netlify-cli
```


## Usage

Add plugin config to your `config/deploy.js`:
```js
{
  'netlify-cli': {
    appName: 'netlify-app-name',
    orgName: 'netlify-org-name',
    authToken: process.env.netlify_AUTH_TOKEN
  }
}
```

Optionaly set revision type to `version-commit` to have unified versioning pattern:
```js
{
  'revision-data': {
    type: 'version-commit'
  }
}
```

Leave the rest for netlify-cli ;) Deploy! 🚀✌️

## License

This project is licensed under the [MIT License](LICENSE.md).
