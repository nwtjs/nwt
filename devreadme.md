Releasing
---------------------

Update package.json, bump version.
Make commit.

git tag -a v0.1.x -m "Release 0.1.x."
git push --tags
npm publish


Running Tests
---------------------
1 - Install with dev packages.

npm install nwt --dev

2  - Run the test server

node test/testserver.js

3 - Visit test server

localhost:3000/test/



Updating Static Site
---------------------

1 - Build JS, jekyll the site

node build/build.js; # jekyll; node jekyll/testserver.js
