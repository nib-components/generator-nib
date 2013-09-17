var modules = require('grunt-modules');
var config = require('grunt-config');

module.exports = function(grunt) {

  /**
   * Set the shared configuration options.
   * This automatically loads all grunt plugins
   * and sets the default task.
   */
  config(grunt, {
    jshint: {
      common: [
        'bundles/common/*.js',
        'bundles/common/lib/*.js'
      ],
    },
    watch: {
      common: {
        files: [
          'bundles/common/index.js',
          'bundles/common/index.css'
        ],
        tasks: [
          'jshint:common',
          'componentbuild'
        ]
      }
    },
    componentinstall: {
      bundles: ['bundles/*']
    }
  });

  grunt.loadNpmTasks('grunt-component-install');
};