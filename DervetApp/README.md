# dervetapp

#### Architecture

```text
start
 |
 V
+-------------------+
|                   |
|     electron      |                  +-------------------+
|                   |       IPC        |                   |
|    (basically     |  communication   |  (business logic  |
|      browser)     | <--------------> |     & dervet)     |
|                   |                  |                   |
|        vue        |                  +-------------------+
|                   |
| (all html/css/js) |
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

# Add a .env file in the root of DervetApp with the following variables set to your python3 executable path and the main DERVET script
DERVET_PYTHON_RUNTIME="/path/to/venv/python3"
DERVET_PYTHON_SCRIPT="/path/to/dervet/run_DERVET.py"
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
