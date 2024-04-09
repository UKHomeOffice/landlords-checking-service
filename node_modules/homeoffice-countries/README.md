# HomeOffice Countries

Exports a list of non-EU countries or EU and non-EU countries.

Can be used with the [Typeahead Aria](https://github.com/UKHomeOffice/typeahed-aria), which is exported with [HOF Frontend Assets](https://github.com/UKHomeOfficeForms/hof-frontend-assets).

## Example Usage

The following is an example of HomeOffice Countries in a HOF `field` with Typeahead Aria:
```
'country-select'-step: {
  mixin: 'select',
  className: ['typeahead', 'js-hidden'],
  options: [''].concat(require('homeoffice-countries').allCountries),
  legend: {
    className: 'visuallyhidden'
  },
  validate: ['required']
},
```
