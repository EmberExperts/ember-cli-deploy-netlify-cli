'use strict';

const { execSync } = require('child_process');
const BasePlugin = require('ember-cli-deploy-plugin');

module.exports = {
  name: require('./package').name,

  createDeployPlugin(options) {
    const DeployPlugin = BasePlugin.extend({
      name: options.name,

      defaultConfig: {
        distDir(context) {
          return context.distDir;
        },

        revisionKey(context) {
          return context.revisionData && context.revisionData.revisionKey;
        }
      },

      requiredConfig: ['siteId', 'authToken'],

      upload() {
        const message = this.readConfig('revisionKey');
        const distDir = this.readConfig('distDir');

        this.log('NETLIFY: Deploying...');
        this.cliExec(`deploy --prod --dir ${distDir} --message "${message}"`);

        this.log('NETLIFY: Deployed!...');
      },

      cliExec(command) {
        const authToken = this.readConfig('authToken');
        const siteId = this.readConfig('siteId');

        return this._exec(
          `NETLIFY_AUTH_TOKEN=${authToken} ` +
          `NETLIFY_SITE_ID=${siteId} ` +
          `node_modules/.bin/netlify ${command}`
        );
      },

      _exec(command = '') {
        return execSync(command, { cwd: this.project.root });
      }
    });

    return new DeployPlugin();
  }
};
