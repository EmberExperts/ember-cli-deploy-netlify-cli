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
      distDir: 'my-dist-dir',
      revisionData: {
        revisionKey: 'v1.0.0+1234567'
      },
      deployTarget: 'my-production',
      config: {
        'netlify-cli': {
          siteId: 'my-project',
          authToken: 'my-auth-token'
        }
      }
    };
  });

  it('has a name', function() {
    const plugin = Plugin.createDeployPlugin({ name: 'netlify-cli' });

    assert.equal(plugin.name, 'netlify-cli');
  });

  describe('implements correct hooks', function() {
    it('upload', function() {
      const plugin = Plugin.createDeployPlugin({ name: 'netlify-cli' });

      assert.equal(typeof plugin.upload, 'function', 'Implements didPrepare');
    });
  });

  describe('configure', function() {
    describe('requires config', function() {
      it('siteId', function() {
        const plugin = Plugin.createDeployPlugin({ name: 'netlify-cli' });

        this.context.config['netlify-cli'].siteId = undefined;

        plugin.beforeHook(this.context);

        assert.throws(() => plugin.configure(this.context), 'Missing required config: `siteId`');
      });

      it('authToken', function() {
        const plugin = Plugin.createDeployPlugin({ name: 'netlify-cli' });

        this.context.config['netlify-cli'].authToken = undefined;

        plugin.beforeHook(this.context);

        assert.throws(() => plugin.configure(this.context), 'Missing required config: `authToken`');
      });
    });

    describe('has default config', function() {
      it('distDir', function() {
        const plugin = Plugin.createDeployPlugin({ name: 'netlify-cli' });

        plugin.beforeHook(this.context);
        plugin.configure(this.context);

        assert.equal(plugin.readConfig('distDir'), 'my-dist-dir');
      });

      it('revisionKey', function() {
        const plugin = Plugin.createDeployPlugin({ name: 'netlify-cli' });

        plugin.beforeHook(this.context);
        plugin.configure(this.context);

        assert.equal(plugin.readConfig('revisionKey'), 'v1.0.0+1234567');
      });
    });
  });

  describe('upload', function() {
    it('deploys to netlify', function() {
      const plugin = Plugin.createDeployPlugin({ name: 'netlify-cli' });
      const stub = this.sinon.stub(plugin, '_exec');

      plugin.beforeHook(this.context);
      plugin.configure(this.context);
      plugin.upload();

      this.sinon.assert.calledWithExactly(stub,
        'NETLIFY_AUTH_TOKEN=my-auth-token ' +
        'NETLIFY_SITE_ID=my-project ' +
        'node_modules/.bin/netlify deploy --prod --dir my-dist-dir --message "v1.0.0+1234567"');
    });
  });
});
