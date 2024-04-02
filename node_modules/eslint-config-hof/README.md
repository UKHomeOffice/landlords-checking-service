# eslint-config-hof
An up-to-date linter for Home Office Forms products. This includes widely used plugins for node, typescript and mocha for instance.

It also has been created to ensure consistent indentation, spacing, and code structure to be implemented across all HOF products for consistency.

## Usage
To use in a project:
```
npm i -SD eslint-config-hof
```
Then in your package.json file for your `test:lint` script, run:
```
eslint . --config ./node_modules/eslint-config-hof/default.js
```

This repo installs all the necessary plugins and dependencies for linting including eslint.
There could potentially be a view to create other configs for different teams here
