var generator = require('../lib/generator');

module.exports = generator.base({
  files: function() {
    this.copy('gitignore', '.gitignore');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('jshintrc', '.jshintrc');
    this.copy('package.json', 'package.json');
    this.copy('Readme.md', 'Readme.md');
    this.directory('components', 'components');
  }
});