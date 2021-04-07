import _ from 'lodash';
import { promises as fsPromises } from 'fs';
import path from 'path';

import { Project } from '@/models/Project/Project';
import * as FileUtil from '@/util/file';

const getApplicationPath = (directory: string) => path.join(directory, 'application.json');

const getProjectPath = (directory: string) => path.join(directory, 'project.json');

export const exportProject = (directory: string, project: Project, application: object) => {
  // TODO LL handle error
  const exportDirectory = path.join(directory, project.name);
  return fsPromises.mkdir(exportDirectory, { recursive: true })
    .then(() => Promise.all([
      FileUtil.writeObjectToFile(getProjectPath(exportDirectory), project),
      FileUtil.writeObjectToFile(getApplicationPath(exportDirectory), application),
    ]));
};

export const importProject = (directory: string) => (
  fsPromises.readdir(directory)
    .then((files: any) => Promise.all(_.map(files, fileName => {
      if (fileName === 'application.json' || fileName === 'project.json') {
        const fullPath = path.join(directory, fileName);
        return fsPromises.readFile(fullPath);
      }
      // TODO: Handle error
      throw new Error('Failed to import project. Please provide project.json and application.json files.');
    })))
    .then(contents => Promise.all(_.map(contents, content => JSON.parse(content.toString('utf8')))))
);
