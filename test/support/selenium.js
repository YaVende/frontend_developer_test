const selenium = require('selenium-standalone');

module.exports = {
  install() {
    console.log("Selenium: ENSURING INSTALLED");

    return new Promise((fulfill, reject) =>
      selenium.install((err, cp) =>
        err ? reject(err) : fulfill()
      )
    )
      .then(_ => console.log("Selenium: INSTALLED"));
  },

  start() {
    console.log("Selenium: STARTING");

    return new Promise((fulfill, reject) =>
      selenium.start((err, cp) => {
        if (err) reject(err);
        else {
          this.seleniumProcess = cp;
          console.log("Selenium: STARTED")
          fulfill();
        }
      })
    );
  },

  stop() {
    console.log("Selenium: STOPPING");
    this.seleniumProcess && this.seleniumProcess.kill();
    console.log("Selenium: STOPPED");
    return Promise.resolve();
  }
};

