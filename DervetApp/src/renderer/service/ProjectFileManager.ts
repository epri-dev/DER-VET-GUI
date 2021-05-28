import _ from 'lodash';
import { promises as fsPromises } from 'fs';
import path from 'path';

import { Project } from '@/models/Project/Project';
import * as FileUtil from '@/util/file';

export const PROJECT_FILE = 'project.json';
export const APPLICATION_FILE = 'application.json';

const getApplicationPath = (directory: string) => path.join(directory, APPLICATION_FILE);

const getProjectPath = (directory: string) => path.join(directory, PROJECT_FILE);

export const exportProject = (directory: string, project: Project, application: object) => {
  // TODO LL handle error
  const exportDirectory = path.join(directory, project.name);
  return fsPromises.mkdir(exportDirectory, { recursive: true })
    .then(() => Promise.all([
      FileUtil.writeObjectToFile(getProjectPath(exportDirectory), project),
      FileUtil.writeObjectToFile(getApplicationPath(exportDirectory), application),
    ]));
};

const readFilesForImport = (files: any, directory: any) => {
  let applicationFileExists = false;
  let projectFileExists = false;
  const promises: Promise<Buffer>[] = [];

  const readFile = (fileName: string) => {
    const fullPath = path.join(directory, fileName);
    promises.push(fsPromises.readFile(fullPath));
  };

  _.each(files, fileName => {
    if (fileName === APPLICATION_FILE) {
      applicationFileExists = true;
      readFile(fileName);
    }
    if (fileName === PROJECT_FILE) {
      projectFileExists = true;
      readFile(fileName);
    }
  });

  if (!applicationFileExists || !projectFileExists) {
    throw new Error(`Failed to import project. Please provide ${PROJECT_FILE} and ${APPLICATION_FILE} files.`);
  }

  return Promise.all(promises);
};

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

const convertParsedToImportDto = (parsed: any) => ({
  project: parsed.find((item: any) => item.storeType === 'project'),
  application: parsed.find((item: any) => item.storeType === 'application'),
});

export const importProject = (directory: string): Promise<object> => (
  fsPromises.readdir(directory)
    .then(files => readFilesForImport(files, directory))
    .then(buffered => parseFileBuffersForImport(buffered))
    .then(parsed => convertParsedToImportDto(parsed))
);
