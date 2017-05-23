const selenium = require('selenium-standalone');

module.exports = {
  install() {
    process.env.DEBUG_MODE && console.log("Selenium: ENSURING INSTALLED");

    return new Promise((fulfill, reject) =>
      selenium.install((err, cp) =>
        err ? reject(err) : fulfill()
      )
    )
      .then(_ => process.env.DEBUG_MODE && console.log("Selenium: INSTALLED"));
  },

  start() {
    process.env.DEBUG_MODE && console.log("Selenium: STARTING");

    return new Promise((fulfill, reject) =>
      selenium.start((err, cp) => {
        if (err) reject(err);
        else {
          this.seleniumProcess = cp;
          process.env.DEBUG_MODE && console.log("Selenium: STARTED")
          fulfill();
        }
      })
    );
  },

  stop() {
    process.env.DEBUG_MODE && console.log("Selenium: STOPPING");
    this.seleniumProcess && this.seleniumProcess.kill();
    process.env.DEBUG_MODE && console.log("Selenium: STOPPED");
    return Promise.resolve();
  }
};

