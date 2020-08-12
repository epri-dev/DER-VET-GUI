# dervetapp

#### Architecture

```text
start
 |
 V
+-------------------+
|                   |     start
|     electron      + ---------------> +-------------------+
|                   |    subprocess    |                   |
|    (basically     |                  | python web server |
|      browser)     |       http       |                   |
|                   | <--------------> |  (business logic  |
|        vue        |  communication   |     & dervet)     |
|                   |                  |                   |
| (all html/css/js) |                  +-------------------+
|                   |
+-------------------+
```

#### Development Setup

``` bash
# install Node on a mac with homebrew
brew install nvm
brew install node

# install Node on windows
https://nodejs.org/en/download/package-manager/#windows

# install vue-cli globally with npm
npm install -g @vue/cli
npm install -g @vue/cli-init

# install project's node dependencies (first time and whenever dependencies in package.json are updated)
npm install

# create a python3 virtualenv named venv in dervetpy and install dependencies
cd dervetpy
pip install virtualenv  # If not already installed
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt

# Add a .env file in the root of DervetApp with the following variable set to your python3 executable path
DERVET_PYTHON_PATH="/path/to/venv/python3"
```

#### Development Commands

``` bash
# serve with hot reload at localhost:9080
npm run dev

# run unit & end-to-end tests
npm test

# lint all JS/Vue component files in src/
npm run lint
```

#### Application Packaging

``` bash
# package python flask backend with pyinstaller TODO: automate this
pyinstaller --onefile dervetpy/api.py
cp dervetpy/dist/api extraResources/
npm run build
```
