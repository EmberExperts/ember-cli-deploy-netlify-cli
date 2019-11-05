/* eslint-disable max-len, max-lines-per-function */
'use strict';

const BasePlugin = require('ember-cli-deploy-plugin');

module.exports = {
  name: require('./package').name,

  createDeployPlugin(options) {
    const DeployPlugin = BasePlugin.extend({
      name: options.name,

      defaultConfig: {
      },

      requiredConfig: [],

      didPrepare() {
      },

      didDeploy() {
      },

      didFail() {
      }
    });

    return new DeployPlugin();
  }
};
