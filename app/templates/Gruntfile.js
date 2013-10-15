var fs = require('fs');

module.exports = function(grunt) {

  /**
   * Default task. Outputs production-ready files
   */
  grunt.registerTask('default', [
    'boot'
  ]);

  /**
   * Install all dependencies for all components
   */
  grunt.registerTask('install', [
    'clean:components',
    'componentinstall'
  ]);

  /**
   * This is where the global options for tasks should be placed
   * as well as any tasks related to the lib directory.
   *
   * @type {Object}
   */
  var config = {

    clean: {
      components: ['components/*/components']
    },

    componentinstall: {},
    cssmin: {},
    uglify: {},
    watch: {},
    bytesize: {},
    sass: {},

    /**
     * Run component-build
     * @type {Object}
     */
    componentbuild: {},

    /**
     * Automatically add vendor prefixes to all built CSS files.
     * This allows us to write CSS without any prefixes
     * @type {Object}
     */
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ff 10']
      }
    },

    /**
     * JSHint checks all JS against a set of defined rules
     * avoid any pitfalls.
     * @type {Object}
     */
    jshint: {
      options: {
        "jshintrc": ".jshintrc",
        "ignores": [
          'components/*/components/**/*.js', // components
          'components/*/test/**/*.js', // tests
          'components/*/build/**/*.js' // built files
        ]
      }
    },

    /**
     * Mocha PhantomJS runs all of our Mocha tests that require
     * a browser-runner using PhantomJS
     * @type {Object}
     */
    mocha_phantomjs: {
      options: {
        reporter: 'dot'
      }
    },

    /**
     * Growl notifcations for events.
     * @type {Object}
     */
    notify: {
      complete: {
        options: {
          title: 'Build Complete',
          message: 'All components built successfully!',
        }
      }
    }

  };

  /**
   * Dynamically create tasks for components
   */
  fs.readdirSync('components').forEach(function(bundle){
    if(fs.statSync('components/' + bundle).isFile()) return;

    /**
     * Mocha PhantomJS runs all of our Mocha tests that require
     * a browser-runner using PhantomJS
     * @type {Object}
     */
    config.mocha_phantomjs[bundle] = [
      'components/'+bundle+'/test/index.html'
    ];

    /**
     * JSHint checks all JS against a set of defined rules
     * avoid any pitfalls.
     * @type {Object}
     */
    config.jshint[bundle] = [
      'components/'+bundle+'/**/*.js'
    ];

    /**
     * Automatically add vendor prefixes to all built CSS files.
     * This allows us to write CSS without any prefixes
     * @type {Object}
     */
    config.autoprefixer[bundle] = {
      files: [{
        expand: true,
        src: 'components/'+bundle+'/build/*.css',
        dest: './'
      }]
    };

    /**
     * CSS minification
     * @type {Object}
     */
    config.cssmin[bundle] = {
      files: [{
        expand: true,
        src: 'components/'+bundle+'/build/*.css',
        dest: './'
      }]
    };

    /**
     * JS minification
     * @type {Object}
     */
    config.uglify[bundle] = {
      files: [{
        expand: true,
        src: [
          'components/'+bundle+'/build/build.js',
          'components/'+bundle+'/build/build-standalone.js'
        ],
        dest: './'
      }]
    };

    /**
     * Removes any folders or files to start
     * from a clean slate.
     * @type {Object}
     */
    config.clean[bundle] = 'components/'+bundle+'/build';

    /**
     * Run component-build
     */
    config.componentbuild[bundle] = {
      options: {
        copy: true
      },
      src: 'components/' + bundle,
      dest: 'components/' + bundle + '/build'
    };

    /**
     * component-build --dev
     * This is used to run tests
     */
    config.componentbuild[bundle + '-dev'] = {
      options: {
        name: 'build-dev',
        dev: true,
        copy: true
      },
      src: 'components/' + bundle,
      dest: 'components/' + bundle + '/build'
    };

    /**
     * component-build --standalone
     * This is used if you want to use the component on the page independantly
     */
    config.componentbuild[bundle + '-standalone'] = {
      options: {
        name: 'build-standalone',
        standalone: true,
        copy: true
      },
      src: 'components/' + bundle,
      dest: 'components/' + bundle + '/build'
    };

    /**
     * Automatically run component-install on all
     * directories listed here
     * @type {String}
     */
    config.componentinstall[bundle] = 'components/' + bundle;

    /**
     * Watch files and directories for changes
     * @type {Object}
     */
    config.watch[bundle + '.js'] = {
      files: [
        'components/'+bundle+'/*.js',
        'components/'+bundle+'/lib/*.js',
        'components/'+bundle+'/templates/*.html'
      ],
      tasks: [
        'jshint:' + bundle,
        'componentbuild:' + bundle,
        'componentbuild:' + bundle + '-dev',
        'componentbuild:' + bundle + '-standalone',
        'mocha_phantomjs:' + bundle,
        'notify:' + bundle
      ]
    };

    /**
     * CSS changes
     */
    config.watch[bundle + '.css'] = {
      files: [
        'components/'+bundle+'/*.css',
        'components/'+bundle+'/lib/*.css',
      ],
      tasks: [
        'componentbuild:' + bundle,
        'autoprefixer:' + bundle,
        'notify:' + bundle
      ]
    };

    /**
     * SCSS changes
     */
    config.watch[bundle + '.scss'] = {
      files: [
        'components/'+bundle+'/*.scss',
        'components/'+bundle+'/lib/*.scss'
      ],
      tasks: [
        'sass:' + bundle,
        'componentbuild:' + bundle,
        'autoprefixer:' + bundle,
        'notify:' + bundle
      ]
    };

    /**
     * Watch the test files
     */
    config.watch[bundle + '.test'] = {
      files: [
        'components/'+bundle+'/test/**'
      ],
      tasks: [
        'mocha_phantomjs:' + bundle,
        'notify:' + bundle
      ]
    };

    /**
     * Compile SCSS to CSS
     */
    config.sass[bundle] = {
      files: [{
        src: 'components/'+bundle+'/*.scss',
        dest: 'components/'+bundle+'/*.css'
      }]
    };

    /**
     * Notifications when build is complete
     */
    config.notify[bundle] = {
      options: {
        title: bundle,
        message: 'Build completed!',
      }
    };

    /**
     * Report on the filesize of all of the built files
     * in every bundle. This is to monitor the output size
     * of the front-end components
     * @type {Object}
     */
    config.bytesize[bundle] = {
      src: [
        'components/' + bundle + '/build/*.js',
        'components/' + bundle + '/build/*.css'
      ]
    };

    /**
     * Register a task so that we can run `grunt bundlename`
     */
    grunt.registerTask(bundle, [
      'jshint:' + bundle,
      'componentbuild:' + bundle,
      'componentbuild:' + bundle + '-dev',
      'componentbuild:' + bundle + '-standalone',
      'autoprefixer:' + bundle,
      'cssmin:' + bundle,
      'uglify:' + bundle,
      'mocha_phantomjs:' + bundle,
      'bytesize:' + bundle,
      'notify:' + bundle
    ]);

    /**
     * Register a task so that we can run `grunt bundlename.test`
     */
    grunt.registerTask(bundle + '.test', [
      'jshint:' + bundle,
      'componentbuild:' + bundle + '-dev',
      'mocha_phantomjs:' + bundle
    ]);

  });

  /**
   * Load all of the tasks from node modules
   */
  grunt.loadNpmTasks('grunt-component-install');
  grunt.loadNpmTasks('grunt-component-build');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-component-build');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-bytesize');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  /**
   * Pass the config to grunt
   */
  grunt.initConfig(config);

};