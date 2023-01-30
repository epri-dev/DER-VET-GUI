# DER-VET™

[DER-VET™](https://der-vet.com) provides a free, publicly accessible, open-source platform for calculating, understanding, and optimizing the value
of distributed
energy resources (DER) based on their technical merits and constraints. An extension of EPRI's [StorageVET®](./storagevet) tool, DER-VET supports
site-specific assessments of energy storage and additional DER technologies—including solar, wind, demand response, electric vehicle charging,
internal combustion engines, and combined heat and power—in different configurations, such as microgrids. It uses load and other data to determine
optimal size, duration, and other characteristics for maximizing benefits based on site conditions and the value that can be extracted from targeted
use cases. Customers, developers, utilities, and regulators across the industry can apply this tool to inform project-level decisions based on sound
technical understanding and unbiased cost-performance data.

DER-VET was developed with funding from the California Energy Commission. EPRI plans to support continuing updates and enhancements.


#### Electron Architecture

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

#### Migrating project.json from V1 to V2
Script: https://github.com/epri-dev/DER-VET/tree/master/migrations/migrate_project_DERVET_GUI.py
Instructions: https://github.com/epri-dev/DER-VET/blob/master/README.md#Migrating

#### Adding a New Use Case
1. In [extraResources/cases](extraResources/cases), add a folder containing project.json files that define a new use case.
2. In [extraResources/cases/cases.json](extraResources/cases/cases.json), add a new entry with the name of the directory you added in Step #1 and the desired display name in the case-selection dropdown menu.
3. Verify (or ask a developer to verify) that the case loads and runs in the app as expected.

#### Development Setup

1. Install Node (any version >= 12)

2. Install vue-cli globally with npm
```
npm install -g @vue/cli
npm install -g @vue/cli-init
```

3. Install project's node dependencies (first time and whenever dependencies in package.json are updated)
```
npm install
```

4. Follow the [backend](../DervetBackend/dervet/README.md) instructions to set up a python environment to run dervet

5. Add a .env file in the root of DervetApp with the following variables set to the python3 executable path (from step #4) and the main DERVET script
```
DERVET_PYTHON_RUNTIME="/path/to/python3"
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

The following assumes you have already gone through the Development Setup steps. Setting up your python environment to run the backend (in the dervet folder) can be done in many ways, but these are specific steps that work for packaging it with pyinstaller.

##### Mac

1. Install [pyenv](https://github.com/pyenv/pyenv)
2. Create a virtual environment with necessary dependencies:
```
env PYTHON_CONFIGURE_OPTS='--enable-shared' pyenv install 3.8.16
cd dervet-gui/DervetBackEnd/dervet
pyenv virtualenv 3.8.16 venv
pyenv activate venv
pip install setuptools==52.0.0
pip install -r requirements.txt -r requirements-packaging.txt
pip install numpy_financial==1.0.0
pip install -e ./storagevet
```

##### Windows

After following the Anaconda3 setup instructions in dervet/README.md setup
```
cd dervet-gui/DervetBackEnd/dervet
conda create -n venv python=3.8.16
conda activate venv
pip install setuptools==52.0.0
conda install conda-forge::blas=*=openblas --file requirements.txt
pip install -r requirements-packaging.txt
pip install numpy_financial==1.0.0
pip install -e ./storagevet
```

Package

In the .env file in the root of DervetApp,
- set PROJECT_SCHEMA_VERSION to the current schema version ("1.0.0")
- Set DERVET_PYTHON_RUNTIME to the proper full path of the python executable
- Set DERVET_PYTHON_SCRIPT to the proper full path of run_DERVET.py

``` bash
# package dervet backend with pyinstaller (note: change absolute dervet and storagevet paths in pyinstaller command)
cd dervet-gui/DervetBackEnd/dervet
pyinstaller --paths=/path/to/dervet-gui/DervetBackEnd/dervet/storagevet --paths=/path/to/dervet-gui/DervetBackEnd/dervet --additional-hooks-dir=./hooks/ --add-data "dervet/Schema.json:dervet" --onefile run_DERVET.py
cp dist/run_DERVET ../../DervetApp/extraResources/
cd dervet-gui/DervetApp
npm install
npm run build
```

Notes on running pyinstaller command on Windows:
- Use `--add-data "dervet/Schema.json;dervet"` (semi-colon instead of colon)

The built installer will be saved to:
- mac: `DervetApp/build/DER-VET-x.x.x-mac.dmg`
- win: `DervetApp/build/DER-VET Setup x.x.x.exe`

Log files from running the packaged application are written here:
- mac:`{user profile}/Library/Logs/DER-VET/main.log`
- win: `{user profile}\AppData\Roaming\DER-VET\logs\main.log`

#### Icon Updating

Save a 256x256 (pixels) to the `build/icons` directory. To convert PNG to ICO and ICNS formats required by Windows and Mac, use a tool like https://hnet.com/png-to-ico/ and https://cloudconvert.com/png-to-icns. Then commit both files to the same `build/icons` folder with the names icon.ico and icon.icns respectively.

## Authors

* **Halley Nathwani**
* **Andrew Etringer**
* **Leah Loversky**
* **Miles Evans**
* **Suma Jothibasu**
* **Ramakrishnan Ravikumar**
* **Andres Cortes**
* **Arindam Maitra**
* **Giovanni Damato**

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## License

This project is licensed under the BSD (3-clause) License - see [LICENSE.txt](./LICENSE.txt).

DER-VET v1.2.3

Copyright © 2022 Electric Power Research Institute, Inc. All Rights Reserved.

Permission to use, copy, modify, and distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright
notice and this permission notice appear in all copies.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL EPRI BE LIABLE FOR ANY DIRECT, INDIRECT, 
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Third-Party Software
EPRI does not own any portion of the software that is attributed
below.

<CVXPY/1.1.11> - &lt;Steven Diamond&gt;, <diamond@cs.stanford.edu>
Copyright © 2017 Steven Diamond

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

CVXPY is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the
implied warranties of merchantability and fitness for a particular
purpose are disclaimed.

This software relies on CVXPY to interface with work(s) covered by the
following copyright and permission notice(s): 

GLPK 5.0 - Andrew Makhorin, mao@gnu.org
Copyright © 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
2010, 2011, 2012 Andrew Makhorin, Department for Applied Informatics,
Moscow Aviation Institute, Moscow, Russia. All rights reserved.

Licensed under GNU Public License v3.0; you may not use GLPK except in
compliance with the License. You may obtain a copy of the License at
https://www.gnu.org/licenses/gpl-3.0.en.html.

GLPK is a free program and is provided by the copyright holders and
contributors "as is" and any express or implied warranties, including,
but not limited to, the implied warranties of merchantability and fitness
for a particular purpose are disclaimed.
