module.exports =
  paths:
    public: process.env.PUBLIC_DIR || './public'

  files:
    javascripts:
      joinTo:
        'vendor.js': /^(bower_components|(\/usr\/lib\/)?node_modules)/
        'app.js':    /^app\//
    stylesheets:
      joinTo:
        'vendor.css': /^(bower_components|(\/usr\/lib\/)?node_modules)/
        'app.css':    /^app\//
      order:
        after: ['app/main.css']
    templates:
      joinTo: "app.js"

  modules:
    autoRequire:
      'app.js': ['main']

  plugins:
    jade:
      options:
        pretty: true
    uglify:
      compress: true
    babel:
      presets: ["es2015", "es2016", "es2017"]
      plugins: [
        "transform-class-properties",
        "transform-object-rest-spread"
      ]
    stylus:
      plugins: ['autoprefixer-stylus']

  npm:
    enabled: true
