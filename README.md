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
    siteId: 'netlify-site-id',
    authToken: process.env.NETLIFY_AUTH_TOKEN
  }
}
```

Extra config:

- `promoteToProd` (DEFAULT: `true`) - Promote deploy to production
- `functionsDir` - (DEFAULT: `''`) - Specify a functions folder to deploy
- `destDir` (DEFAULT: ember dist) - Specify a folder to deploy

_____

Optionally you can set revision type to `version-commit` to have unified versioning pattern:
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
