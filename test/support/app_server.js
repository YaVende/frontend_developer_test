const spawn = require('threads').spawn;

module.exports = {
  start() {
    console.log("App server: STARTING");

    process.env.API_URL = "http://localhost:1234";

    return new Promise((fulfill, reject) =>
      this.childProcess =
        spawn((_, __, progress) => {
          const brunchWatch = require('brunch/lib/watch');

          brunchWatch(true, '.', {
            server: true,
            port:   3331,
          }, _ => progress(1))
        })
          .on('progress', fulfill)
          .on('done', fulfill)
          .on('error', reject)
          .send()
    )
      .then(_ => console.log("App server: STARTED"))
      .catch(error => {
        console.log(`App server: ERROR: ${error}`);
        return Promise.reject(error);
      });
  },

  stop() {
    console.log("App server: STOPPING");
    this.childProcess && this.childProcess.kill();
    console.log("App server: STOPPED");
    return Promise.resolve();
  }
};
