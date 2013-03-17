# grunt-zip

Zip and unzip files via a grunt plugin

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-zip`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-zip');
```

[grunt]: http://gruntjs.com/
[getting_started]: https://github.com/gruntjs/grunt/blob/master/docs/getting_started.md

## Documentation
`grunt-zip` introduces two grunt tasks: zip and unzip.

### zip
```js
grunt.initConfig({
  zip: {
    // We accept short syntax
    // 'destinationZip': ['firstFileToZip', 'secondFileToZip', ...]
    'acme.zip': ['index.html', 'rocket.js'],

    // As well as standard grunt sytax
    widgets: {
      // Files to zip together
      src: ['corkscrew.js', 'sillyStraw.js'],

      // Destination of zip file
      dest: 'widgets.zip'
    },

    // Specify working directory to zip from via `cwd`
    'more-widgets': {
      cwd: 'nested/'
      // Files will zip to 'corkscrew.js' and 'sillyStraw.js'
      src: ['nested/corkscrew.js', 'nested/sillyStraw.js'],
      dest: 'moreWidgets.zip'
    },

    // Adjust file paths via `router` for complex cases
    site: {
      // Route all files to their filename
      router: function (filepath) {
        var filename = path.basename(filepath);
        return filename;
      }

      // Files will zip to 'main.js' and 'main.css'
      src: ['js/main.js', 'css/main.css'],
      dest: 'site.zip'
    }
  }
});
```

### unzip
```js
grunt.initConfig({
  'unzip': {
    // Short syntax
    // 'folderToExtractFilesTo': 'zipFileToExtract'
    gallery: 'photos.zip',

    // Long syntax
    catalog: {
      src: 'electronics.zip',
      dest: 'catalog'
    }

    // Note: If you provide multiple src files, they will all be extracted to the same folder.
    // This is not well-tested behavior so use at your own risk.

    // Adjust file paths of zipped files via `router`
    site: {
      // Route all files to their filename
      router: function (filepath) {
        var filename = path.basename(filepath);
        return filename;
      }

      // Collects all nested files in same directory
      // css/bootstrap.css -> bootstrap.css, js/bootstrap.js -> bootstrap.js
      src: 'bootstrap.zip',
      dest: 'bootstrap/'
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [grunt][grunt] and test via `npm test`.

## License
Copyright (c) 2013 Todd Wolfson
Licensed under the MIT license.
