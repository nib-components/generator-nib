# generator-nib

Yo generator for the nib Front-end Components

```
	npm install -g generator-nib
```

## Commands

####Install a new front-end

```
	yo nib
```

Once this command has added installation files, it should automagically run the following commands for you:

```npm install``` to get the npm dependencies.

```component install``` (inside of ```components/boot```) to get the component dependencies.

**Once the dependencies have been installed, you'll need to run .... **

```
  grunt
```

aaaaaaand **Viola**!


####Create a new component

```
	yo nib:component {name} // yo nib:component my-js-component
```

Follow the prompts to create the component.

**Note**: The new components **name** will need to be added to the "local" array inside of ```components/boot/component.json```.

```
  {
  "name": "boot",
  "paths": [
    "../""
  ],
  "local": [
	"my-js-component",
	"my-css-component"
  ],
  ...
```
