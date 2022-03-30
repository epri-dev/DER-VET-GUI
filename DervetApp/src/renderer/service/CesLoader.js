import fs from 'fs';

import { papaParsePromise, getExtraResourcesPath } from '@/util/file';

const CES_FILE_NAME = 'ces4.0.csv';

const makeFileFromFileName = () => fs.createReadStream(getExtraResourcesPath(CES_FILE_NAME));

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
