var generator = require('../lib/generator');

/**
 * Create a named Generator
 * @type {Function}
 */

var Generator = generator.named();

/**
 * Ask the user about the type of Component this is
 * @return {void}
 */

Generator.prototype.askFor = function(){
  var cb = this.async();
  var self = this;

  var prompts = [{
    type: "confirm",
    name: 'bundle',
    message: 'Is this component a bundle?'
  }, {
    name: 'description',
    message: 'Add a description (optional)'
  }, {
    type: "confirm",
    name: 'js',
    message: 'Does this component contain JS?'
  }, {
    type: "confirm",
    name: 'css',
    message: 'Does this component contain CSS?'
  }, {
    type: "confirm",
    name: 'html',
    message: 'Does this component contain HTML?'
  }, {
    type: "confirm",
    name: 'readme',
    message: 'Include a Readme file?'
  }];

  this.prompt(prompts, function (props) {
    self.opts = props;
    cb();
  });
};

/**
 * JS-related component questions
 * @return {void}
 */

Generator.prototype.askForJS = function(){
  if(!this.opts.js) return;

  var cb = this.async();
  var self = this;

  var prompts = [{
    type: "confirm",
    name: 'tests',
    message: 'Does this component need tests?'
  }];

  this.prompt(prompts, function (props) {
    self.opts.tests = props.tests;
    cb();
  });
};

/**
 * Output all the files and directories
 * @return {void}
 */

Generator.prototype.files = function() {

  // If it's a bundle or a component
  var path = this.opts.bundle ? "bundles/" : "lib/";

  // Where files will be output to
  this.destinationRoot(path + this.name);

  // Create the component.json
  var component = {};
  component.name = this.name;
  component.description = this.opts.description;

  // Include Mocha test runner
  if(this.opts.tests) {
    this.directory('test', 'test');
    component.development = {
      "visionmedia/mocha": "*",
      "component/assert": "*"
    };
  }

  // Include basic stylesheet
  if(this.opts.css) {
    this.copy('index.css', 'index.css');
    component.styles = [];
    component.styles.push('index.css');
  }

  // Include a template
  if(this.opts.html) {
    this.mkdir('templates');
    this.copy('template.html', 'templates/template.html');
    component.templates = [];
    component.templates.push('templates/template.html');
  }

  // Include a script
  if(this.opts.js) {
    this.copy('index.js', 'index.js');
    component.scripts = [];
    component.scripts.push('index.js');
  }

  // Add a readme to describe the component
  if(this.opts.readme) {
    this.template('_Readme.md', 'Readme.md');
  }

  this.write('component.json', JSON.stringify(component, null, 2));
};

/**
 * Export it
 * @type {Function}
 */

module.exports = Generator;