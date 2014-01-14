# generator-nib

Yo generator for the nib Front-end components

```
	npm install -g generator-nib
```

## API

###Generate a new front-end

Change into the desired directory you wish to generate your project in from the command line. e.g. 'app'

```
	yo nib
```

Once this command has added installation files, it should automagically run the following commands for you:

+ ```npm install``` for npm dependencies
+  ```component install``` for  [component](https://github.com/component/component) dependencies.

The following structure should've now been generated.

```
├── app
│   ├── .gitignore
│   ├── Gruntfile.js
│   ├── .jshintrc
│   ├── package.json
│   ├── Readme.md
│   └── components
│       └── boot
│       	  ├── component.json
│       	  ├── index.css
│       	  ├── index.js
│       	  └── components
│       	  	  └── ... (boot's dependencies)
```

Once dependencies have been installed, you'll need to run ```grunt``` to build your project and **BAM**! ...You're good to go.


###Create a new component

From your freshly populated directory (app) run:

```
	yo nib:component {name}    // e.g. yo nib:component my-js-component
```

Follow the prompts to create your new component. This new component will then be generated a located alongside the **boot** component.

```
├── app
│   ├── .gitignore
│   ├── Gruntfile.js
│   ├── .jshintrc
│   ├── package.json
│   ├── Readme.md
│   └── components
│       ├── boot
│       ├── my-css-component
│       └── my-js-component
```

Wire up this new component by adding it's name to the **local** array inside of ```components/boot/component.json```.

```
  {
  "name": "boot",
  "paths": [
    "../""
  ],
  "local": [
	"my-css-component",
	"my-js-component"
  ],
  ...
```

###Including your new components into the build

The Gruntfile.js will take care of including any css components into the build for you automatically.

To include your JS components into the build, you'll need to require them in the ```components/boot/index.js``` file. Think of this index.js file as the main JavaScript file of your front-end.

```
require('shims');
require('modernizr');
require('ga')('TRACKINGID');

// Require modules here
var AwesomeJSModule = require('my-js-component');

var myModule = new AwesomeJSModule({
  foo: bar
});
```
