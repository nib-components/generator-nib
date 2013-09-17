var util = require('util');
var yeoman = require('yeoman-generator');
var generator = yeoman.generators.Base;
var named = yeoman.generators.NamedBase;

exports.base = function(proto){
  function Generator(args, options, config) {
    generator.apply(this, arguments);
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