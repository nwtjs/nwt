Releasing

---------------------

Update package.json, bump version.
Make commit.

git tag -a v0.0.x -m "Release 0.0.x."
git push --tags
npm publish
