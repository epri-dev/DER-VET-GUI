import fs from 'fs';
import path from 'path';

import { papaParsePromise } from '@/util/file';

const CES_FILE_NAME = 'ces3.0.csv';

const getFilePath = () => {
  const builtPath = path.join(process.resourcesPath, 'extraResources', CES_FILE_NAME);
  const devPath = path.join(__dirname, CES_FILE_NAME);
  return fs.existsSync(builtPath) ? builtPath : devPath;
};

const makeFileFromFileName = () => fs.createReadStream(getFilePath());

const loadCesScoresFromFile = () => {
  /**
    The data in ces3.0.csv is a subset of the fields available in version 3.0
    of the dataset behind California Communities Environmental Health Screening Tool
    (CalEnviroScreen). See the website for more information:
    https://oehha.ca.gov/calenviroscreen/report/calenviroscreen-30.
  */
  const file = makeFileFromFileName();
  return papaParsePromise(file);
};

export default loadCesScoresFromFile;
