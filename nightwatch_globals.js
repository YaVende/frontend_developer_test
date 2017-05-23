const apiMock   = require('./test/support/api_mock');
const selenium  = require('./test/support/selenium');
const appServer = require('./test/support/app_server');

module.exports = {
  default: {
    apiMock,

    before(done) {
      Promise
        .all([
          apiMock.start(),
          selenium.start(),
          appServer.start()
        ])
        .then(done)
        .catch(_ => done(...arguments));
    },

    after(done) {
      Promise
        .all([
          apiMock.stop(),
          selenium.stop(),
          appServer.stop()
        ])
        .then(done)
        .catch(_ => done(...arguments));
    }
  }
};
