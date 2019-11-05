/* eslint-disable max-lines-per-function */
const { assert } = require('chai');
const sinon = require('sinon');
const Plugin = require('../../index');

function setupSinon() {
  before(function() {
    this.sinon = sinon.createSandbox();
  });

  afterEach(function() {
    this.sinon.restore();
  });
}

const stubProject = {
  name() {
    return 'my-project';
  }
};

const mockUi = {
  verbose: true,
  messages: [],
  write() { },
  writeLine(message) {
    this.messages.push(message);
  }
};

describe('netlify-cli', function() {
  setupSinon();

  beforeEach(function() {
    this.context = {
      ui: mockUi,
      project: stubProject,
      distDir: 'my-dest-dir',
      revisionData: {
        revisionKey: 'v1.0.0@1234567'
      },
      deployTarget: 'my-production',
      config: {
        'netlify-cli': {
        }
      }
    };
  });
});
