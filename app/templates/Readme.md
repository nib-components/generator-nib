# Content

## Installation

First you need to install dependencies:

```
npm install
```

Then run the Grunt build:

```
grunt
```

To use the generators you'll need Yo and generator-nib:

```
npm install -g yo generator-nib
```

## Structure

#### assets
Contains the images other assets used directly in the HTML and not related to a component

#### bundles
Each bundle is built separately and can be included on the page. There is always a 'common' bundle

#### lib
Contains local components. These are both JS and CSS

#### Gruntfile.js
Build configuration

#### package.json
npm dependencies for the Grunt build

## Running the build

To run the full build:

```
grunt
```

For a list of tasks available run:

```
grunt -h
```

For more information on Grunt, see the documentation.

## Development Workflow

### Watching

While developing Grunt can watch files for changes and automatically run individual parts of the build.

```
grunt watch
```

### Generators

To make life easier, there are generators you can use to automatically create bundles and components
in the correct location with everything wired up.

We're using Yo, the Yeoman generator module. Yo is easy to use. To generate a full project:

```
yo nib
```

To create a new component:

```
yo nib:component name
```

## Creating Components

Components contain any combination of CSS, JS and HTML. They live in the lib directory. To create a new component
run:

```
yo nib:component slideshow
```

It will ask you a few questions about the type of component you are going to create and then create it for you
in the lib directory.

You can now reference this component in any bundle that needs it. For example, you might add it to the common
bundle by editing `bundles/common/component.json`

```
{
  "name": "common",
  "local": ["slideshow"]
}
```

The component name is added to the `local` field. Now when the common bundle is built it will pull the CSS and JS
contained within that component.

For more information about how components work, see the documentation.