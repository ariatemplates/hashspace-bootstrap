export PACKAGE_VERSION=`node -e 'console.log(require("./package.json").version)'`
echo "hashspace-bootstrap version: $PACKAGE_VERSION"
if [ "$TRAVIS_PULL_REQUEST" = "false" ] && [ "$TRAVIS_SECURE_ENV_VARS" = "true" ]; then
    # we execute the release task
    gulp package &&
    rm target/release -r -f &&
    # we need to clone the repo once again, as by default Travis CI makes
    # shallow clones where gh-pages branch is not available and can't be fetched
    git clone "https://github.com/${TRAVIS_REPO_SLUG}.git" target/release && cd target/release &&
    git config --global user.email "releasebot@ariatemplates.com" &&
    git config --global user.name "Titan Bot" &&
    git checkout -b gh-pages origin/gh-pages &&
    # we copy the packaged app into the right folder
    cp -rv ../prod/*.* . &&
    mkdir -p "./dist/${PACKAGE_VERSION}" &&
    cp -rv ./hashspace* "./dist/${PACKAGE_VERSION}/" &&
    # we add everything
    git add -f . &&
    # we let git check for deleted files
    git add -u . &&
    git commit -m "release ${TRAVIS_COMMIT}" &&
    git push --quiet "https://${GH_CREDENTIALS}@github.com/${TRAVIS_REPO_SLUG}.git" gh-pages
fi
