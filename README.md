# NHS.UK Decorated Components · [![test](https://github.com/x-govuk/nhsuk-decorated-components/actions/workflows/test.yml/badge.svg)](https://github.com/x-govuk/nhsuk-decorated-components/actions/workflows/test.yml)

Form components for the NHS.UK Design System that require less parameters to collect data. [Replace the multiple parameters needed for saving data with a single `decorate` parameter](https://x-govuk.github.io/govuk-prototype-rig/using-data/form-components/).

## Requirements

Node.js v24 or later.

## Installation

```shell
npm install nhsuk-decorated-components --save
```

## Usage

To add them to the NHS.UK Prototype Kit, follow these steps:

1. In `app.js`, add `/node_modules/nhsuk-decorated-components` to your prototype’s `viewsPath` array, and add the `decorate` function to `globals`. For example:

   ```diff
   + import { decorate } from 'nhsuk-decorated-components'
     import NHSPrototypeKit from 'nhsuk-prototype-kit'

     // Local dependencies
     import config from './app/config.js'
     import sessionDataDefaults from './app/data/session-data-defaults.js'
     import filters from './app/filters.js'
     import locals from './app/locals.js'
     import locals from './app/routes.js'

     async function init() {
       const prototype = await NHSPrototypeKit.init({
         buildOptions: {
           entryPoints: [
             'app/assets/sass/main.scss',
             'app/assets/javascript/*.js'
           ]
         },
         locals,
         filters,
   +     globals: {
   +       decorate
   +     },
         routes,
         serviceName: config.serviceName,
         sessionDataDefaults,
         viewsPath: [
           'app/views/',
   +       'node_modules/nhsuk-decorated-components'
         ]
       })

       prototype.start(config.port)
     }

     init()
   ```

2. Replace imported NHS.UK Frontend macros with those provided by this package:

   ```diff
   + {% from "x-nhsuk/decorated/button/macro.njk" import button with context %}
   + {% from "x-nhsuk/decorated/character-count/macro.njk" import characterCount with context %}
   + {% from "x-nhsuk/decorated/checkboxes/macro.njk" import checkboxes with context %}
   + {% from "x-nhsuk/decorated/date-input/macro.njk" import dateInput with context %}
   + {% from "x-nhsuk/decorated/file-upload/macro.njk" import fileUpload with context %}
   + {% from "x-nhsuk/decorated/input/macro.njk" import input with context %}
   + {% from "x-nhsuk/decorated/password-input/macro.njk" import passwordInput with context %}
   + {% from "x-nhsuk/decorated/radios/macro.njk" import radios with context %}
   + {% from "x-nhsuk/decorated/search-input/macro.njk" import searchInput with context %}
   + {% from "x-nhsuk/decorated/select/macro.njk" import select with context %}
   + {% from "x-nhsuk/decorated/textarea/macro.njk" import textarea with context %}
   ```

## Releasing a new version

`npm run release`

This command will ask you what version you want to use. It will then publish a new version on NPM, create and push a new git tag and then generate release notes ready for posting on GitHub.

> [!NOTE]
> Releasing a new version requires permission to publish packages to the `@x-govuk` organisation.
