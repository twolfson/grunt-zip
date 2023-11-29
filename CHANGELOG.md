# grunt-zip changelog
0.21.0 - Upgraded to jszip@3.8.0 to fix GitHub vulnerability warning

0.20.0 - Upgraded to jszip@2.7.0 to fix GitHub vulnerability warning and #54

0.19.0 - Updated Node.js versions in Travis CI

0.18.2 - Upgraded to shell-quote@1.6.1 to fix GitHub vulnerability warning

0.18.1 - Fixed symlinking when a file already exists, via @octachrome in #53

0.18.0 - Added symlink support via @octachrome in #52. Fixes #41

0.17.1 - Repaired test status and adjusted node version support

0.17.0 - Added support to extract UNIX file permissions

0.16.2 - Moved Travis CI to more restrictive `npm` upgrade to fix `node@0.8`

0.16.1 - Rewrote docs to make them more understandable

0.16.0 - Removed legacy filtering of leaf nodes. By @michaelsantiago

0.15.0 - Upgraded to `jszip@2.2.2`, fixes `DEFLATE` issue in #25

0.14.0 - Moved test suite to `mocha` to make standalone tests easier

0.13.0 - Added verbose output and updated unzip test for no src files. Fixes #24

0.12.0 - Robustified unzipping empty directories logic. Fixes #21 for OSX

0.11.0 - Fixed bug with unzipping empty directories. Fixes #21

0.10.2 - Added Travis CI

0.10.1 - Upgraded devDependencies from grunt@0.3 to grunt@0.4

0.10.0 - Fixed Windows -> Linux zip compatibility bug. Via #20

0.9.1 - Added assertion against `cwd` and `router` in same config

Before 0.9.1 - See `git log`
