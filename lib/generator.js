var util = require('util'),
  yeoman = require('yeoman-generator'),
  generator = yeoman.generators.Base,
  named = yeoman.generators.NamedBase,
  spawn = require('win-spawn'),
  colors = require('colors');

exports.base = function(proto){
  function Generator(args, options, config) {
    generator.apply(this, arguments);

    this.on('end', function () {
      console.log('\n\nIntalled!. Running ' + 'npm install'.bold.green + ' & ' + 'component install'.bold.green + ' for you to install the required dependencies. If this fails, try running the commands yourself.\n\n');
      spawn('npm', ['install'], { stdio: 'inherit' });
      spawn('component', ['install'], { cwd: './components/boot', stdio: 'inherit' });
    });
  }
  util.inherits(Generator, generator);
  for(var key in proto) {
    Generator.prototype[key] = proto[key];
  }
  return Generator;
};

exports.named = function(proto){
  function Generator(args, options, config) {
    named.apply(this, arguments);
  }
  util.inherits(Generator, named);
  for(var key in proto) {
    Generator.prototype[key] = proto[key];
  }
  return Generator;
};