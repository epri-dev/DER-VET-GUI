# dervetapp

#### Dependencies

``` bash
# install Node on a mac with homebrew
brew install nvm
brew install node

# install Node on windows
https://nodejs.org/en/download/package-manager/#windows

# install vue-cli with npm
npm install -g @vue/cli
npm install -g @vue/cli-init

# Create a python3.6 virtualenv named venv in dervetpy
cd dervetpy
pip install virtualenv  # If not already installed
virtualenv venv
```

#### Build Setup

``` bash
# install dependencies (first time only)
npm install

cd dervetpy
pip install -r requirements.txt

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test

# lint all JS/Vue component files in `src/`
npm run lint
```
