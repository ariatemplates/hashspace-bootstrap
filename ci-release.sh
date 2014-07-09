export PACKAGE_VERSION=`node -e 'console.log(require("./package.json").version)'`
echo "hashspace-bootstrap version: $PACKAGE_VERSION"
if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_SECURE_ENV_VARS" = "true" ]; then
    echo "Starting release ..." &&
    rm target/prod -r -f &&
    # we need to clone the repo once again, as by default Travis CI makes
    # shallow clones where gh-pages branch is not available and can't be fetched
    git clone "https://github.com/${TRAVIS_REPO_SLUG}.git" target/prod && cd target/prod &&
    git config user.email "releasebot@ariatemplates.com" &&
    git config user.name "Titan Bot" &&
    git checkout -b gh-pages origin/gh-pages &&
    # we execute the release task
    cd ../.. &&
    gulp package &&
    cd target/prod &&
    # we copy the packaged app into the right folder
    mkdir -p "./dist/${PACKAGE_VERSION}" &&
    cp -rv ./hashspace* "./dist/${PACKAGE_VERSION}/" &&
    # we add everything
    git add -f . &&
    # we let git check for deleted files
    git add -u &&
    git commit -m "release ${TRAVIS_COMMIT}" &&
    echo "Pushing release ..." &&
    git push --quiet "https://${GH_CREDENTIALS}@github.com/${TRAVIS_REPO_SLUG}.git" gh-pages &&
    echo "Release done!"
fi
