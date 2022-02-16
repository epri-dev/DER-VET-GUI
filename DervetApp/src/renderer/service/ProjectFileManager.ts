import _ from 'lodash';
import { promises as fsPromises } from 'fs';
import path from 'path';

import { Project } from '@/models/Project/Project';
import * as FileUtil from '@/util/file';

export const PROJECT_FILE = 'project.json';
const { PROJECT_SCHEMA_VERSION } = process.env;

const getProjectPath = (directory: string) => path.join(directory, PROJECT_FILE);

export const exportProject = (directory: string, project: Project) => {
  // TODO LL handle error
  const projectCopy = _.cloneDeep(project);
  projectCopy.schemaVersion = PROJECT_SCHEMA_VERSION;
  const exportDirectory = path.join(directory, project.name);
  return fsPromises.mkdir(exportDirectory, { recursive: true })
    .then(() => Promise.all([
      FileUtil.writeObjectToFile(getProjectPath(exportDirectory), project),
    ]));
};

const readFilesForImport = (files: any, directory: any) => {
  let projectFileExists = false;
  const promises: Promise<Buffer>[] = [];

  const readFile = (fileName: string) => {
    const fullPath = path.join(directory, fileName);
    promises.push(fsPromises.readFile(fullPath));
  };

  _.each(files, fileName => {
    if (fileName === PROJECT_FILE) {
      projectFileExists = true;
      readFile(fileName);
    }
  });

  if (!projectFileExists) {
    throw new Error(`Failed to import project. Please provide a ${PROJECT_FILE} file.`);
  }

  return Promise.all(promises);
};

// Change to just reading a single buffer
const parseFileBuffersForImport = (contents: any) => {
  const promises: Promise<object>[] = [];
  _.each(contents, content => {
    try {
      promises.push(JSON.parse(content.toString('utf8')));
    } catch {
      throw new Error('Invalid JSON');
    }
  });
  return Promise.all(promises);
};

// TODO eventually unnecessary
const convertParsedToImportDto = (parsed: any) => (
  parsed.find((item: any) => item.storeType === 'project')
);

export const importProject = (directory: string): Promise<object> => (
  // TODO change to just fsPromises.readFile(file)
  fsPromises.readdir(directory)
    .then(files => readFilesForImport(files, directory))
    .then(parseFileBuffersForImport)
    .then(convertParsedToImportDto)
);

export const checkSchemaVersion = (project: any): Promise<object> => {
  // TODO update with the link to Andrew's powerpoint
  const errorMsg = `Import Error: This project is incompatible with the current GUI release.<br/> 
    To check whether your project is compatible, open the project.json file: it must contain a schemaVersion equal to ${PROJECT_SCHEMA_VERSION}.<br/>
    To migrate a project exported with a previous version to the most current, see <b>link to script</b>`;
  return new Promise((resolve, reject) => {
    project.schemaVersion === PROJECT_SCHEMA_VERSION ? resolve(project) : reject(errorMsg); // eslint-disable-line
  });
};
