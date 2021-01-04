import fs from 'fs';
import path from 'path';

import { papaParsePromise } from '@/util/file';

const makeFileFromFileName = fileName => fs.createReadStream(path.join(__dirname, fileName));

const loadCesScoresFromFile = () => {
  /**
    The data in ces3.0.csv is a subset of the fields available in version 3.0
    of the dataset behind California Communities Environmental Health Screening Tool
    (CalEnviroScreen). See the website for more information:
    https://oehha.ca.gov/calenviroscreen/report/calenviroscreen-30.
  */
  const file = makeFileFromFileName('ces3.0.csv');
  return papaParsePromise(file);
};

export default loadCesScoresFromFile;
