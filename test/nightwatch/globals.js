const apiMock   = require('../support/api_mock');
const selenium  = require('../support/selenium');
const appServer = require('../support/app_server');

const disableAppServer =
  ["true", "1"].indexOf(process.env.DISABLE_APP_SERVER) !== -1;

module.exports = {
  launchUrl: process.env.APP_HOST || 'http://localhost:3331',

  default: {
    apiMock,
    launchUrl: process.env.APP_HOST || 'http://localhost:3331',
    before(done) {
      const promises = [
        apiMock.start(),
        selenium.start(),
      ];

      if(!disableAppServer) promises.push(appServer.start());

      Promise.all(promises)
        .then(done)
        .catch(_ => done(...arguments));
    },

    after(done) {
      const promises = [
        apiMock.stop(),
        selenium.stop(),
      ];

      if(!disableAppServer) promises.push(appServer.stop());

      Promise.all(promises)
        .then(done)
        .catch(_ => done(...arguments));
    }
  }
};
