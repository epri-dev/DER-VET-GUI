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

Setup & Dependencies

1. Install [pyenv](https://github.com/pyenv/pyenv) and [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv).
2. Create a virtual environment with necessary dependencies:
```
env PYTHON_CONFIGURE_OPTS='--enable-shared' pyenv install 3.6.5
cd dervet-gui/DervetBackEnd
pyenv local 3.6.5
pyenv virtualenv 3.6.5 venv
pip install -r requirements.txt -r packaging-requirements.txt
```

Package

``` bash
# package dervet backend with pyinstaller (note: change absolute dervet and storagevet paths in pyinstaller command)
cd dervet-gui/DervetBackEnd/dervet
pyinstaller --paths=/path/to/dervet-gui/DervetBackEnd/dervet/storagevet --paths=/path/to/dervet-gui/DervetBackEnd/dervet --additional-hooks-dir=./hooks/ --add-data "Schema.json:."  --onefile run_DERVET.py
cp dist/run_DERVET ../../DervetApp/extraResources/
cd dervet-gui/DervetApp
npm run build
```

Notes on running pyinstaller command on Windows:
- Use `--add-data "Schema.json;."` (semi-colon instead of colon)
- If running on Windows 10, you may need to specify the path to the libopenblas.dll file used by CVXOPT (it should be in `{python distribution}Lib\site-packages\cvxopt\.lib`)

The built installer will be saved to:
- mac: `DervetApp/build/dervetapp-x.x.x-mac.dmg`
- win: `DervetApp/build/dervet-app Setup 0.0.1.exe`

Log files from running the packaged application will be written here:
- mac:`{user profile}/Library/Logs/dervetapp/main.log`
- win: `{user profile}\AppData\Roaming\dervetapp\logs\main.log`
