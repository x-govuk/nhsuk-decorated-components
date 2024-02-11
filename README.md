# NHS.UK Decorated Components · [![test](https://github.com/x-govuk/nhsuk-decorated-components/actions/workflows/test.yml/badge.svg)](https://github.com/x-govuk/nhsuk-decorated-components/actions/workflows/test.yml)

Form components for the NHS.UK Design System that require less parameters to collect data. [Replace the multiple parameters needed for saving data with a single `decorate` parameter](https://x-govuk.github.io/govuk-prototype-rig/using-data/form-components/).

## Requirements

Node.js v20 or later.

## Installation

> [!NOTE]
> These components are included by default with the [NHS.UK Prototype Rig](https://x-govuk.github.io/nhsuk-prototype-rig/).

```shell
npm install nhsuk-decorated-components --save
```

## Usage

To add them to the NHS.UK Prototype Kit, follow these steps:

1. Add `/node_modules/nhsuk-decorated-components` to your application’s views (`appViews`) in `server.js`:

   ```diff
     // Set up App
     var appViews = extensions.getAppViews([
   +   path.join(projectDir, '/node_modules/nhsuk-decorated-components'),
       path.join(projectDir, '/app/views/'),
       path.join(projectDir, '/lib/')
     ])
   ```

2. Add the `decorate` global function to your Nunjucks environment (`nunjucksAppEnv`) in `server.js`:

   ```diff
     var nunjucksAppEnv = nunjucks.configure(appViews, nunjucksConfig)

     // Add Nunjucks Globals
   + const { decorate } = require('nhsuk-decorated-components')
   + nunjucksAppEnv.addGlobal('decorate', decorate)

     // Add Nunjucks filters
     utils.addNunjucksFilters(nunjucksAppEnv)
   ```

3. Replace imported NHS.UK Frontend macros with those provided by this package:

   ```diff
   + {% from "x-nhsuk/decorated/button/macro.njk" import button with context %}
   + {% from "x-nhsuk/decorated/checkboxes/macro.njk" import checkboxes with context %}
   + {% from "x-nhsuk/decorated/date-input/macro.njk" import dateInput with context %}
   + {% from "x-nhsuk/decorated/input/macro.njk" import input with context %}
   + {% from "x-nhsuk/decorated/radios/macro.njk" import radios with context %}
   + {% from "x-nhsuk/decorated/select/macro.njk" import select with context %}
   + {% from "x-nhsuk/decorated/textarea/macro.njk" import textarea with context %}
   ```
