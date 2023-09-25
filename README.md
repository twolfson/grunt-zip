# grunt-zip

This package is forked from https://github.com/twolfson/grunt-zip. JSZip is updated to v3.10.1 for fixing vulnerability issues as listed in https://security.snyk.io/package/npm/jszip.

**Original Readme**
https://github.com/twolfson/grunt-zip/blob/master/README.md

**Changes Done**

1. Migrate JSZip from ~2.7.0 to ~3.10.1
2. Follow https://stuk.github.io/jszip/documentation/upgrade_guide.html for migration
3. Bump grunt dev dependencies to latest versions
4. Add .nvmrc file with node version 16
5. Replace var with let and const in tasks/zip.js

**Local Setup**

1. `nvm use` -> `nvm install` (if not done already)
2. `npm install`

**Running tests**
`npm run test`
