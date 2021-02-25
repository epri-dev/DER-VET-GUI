import _ from 'lodash';
import { promises as fsPromises } from 'fs';
import path from 'path';
import unzipper from 'unzipper';

import { Project } from '@/models/Project/Project';
import * as FileUtil from '@/util/file';
import zipDirectory from '@/util/zip';

const getApplicationPath = (directory: string) => path.join(directory, 'application.json');

const getProjectPath = (directory: string) => path.join(directory, 'project.json');

export const exportProject = (directory: string, project: Project, application: object) => {
  // TODO LL handle error
  const exportDirectory = path.join(directory, project.name);
  const zippedFile = path.join(directory, `${project.name}.zip`);

  return fsPromises.mkdir(exportDirectory, { recursive: true })
    .then(() => Promise.all([
      FileUtil.writeJsonToFile(getProjectPath(exportDirectory), project),
      FileUtil.writeJsonToFile(getApplicationPath(exportDirectory), application),
    ]))
    .then(() => zipDirectory(exportDirectory, zippedFile))
    .then(() => fsPromises.rmdir(exportDirectory, { recursive: true }));
};

export const importProject = (directory: string) => (
  unzipper.Open.file(directory)
    .then(dir => Promise.all(_.map(dir.files, file => {
      if (file.path === 'application.json' || file.path === 'project.json') {
        return file.buffer();
      }
      // TODO: Handle error
      throw new Error('Failed to import project');
    })))
    .then(contents => Promise.all(_.map(contents, content => JSON.parse(content.toString('utf8')))))
);
