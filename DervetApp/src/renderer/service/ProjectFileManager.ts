import _ from 'lodash';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import unzipper from 'unzipper';

import * as FileUtil from '@/util/file';
import { zipDirectory } from '@/util/zip';

const getApplicationPath = (directory: string) => path.join(directory, 'application.json');

const getProjectPath = (directory: string) => path.join(directory, 'project.json');

export const exportProject = (directory: string, project: Project, application: object) => {
  try {
    const exportDirectory = path.join(directory, project.name);
    const zippedFile = path.join(directory, `${project.name}.zip`);

    return fsPromises.mkdir(exportDirectory, { recursive: true })
      .then(() => Promise.all([
        FileUtil.writeJsonToFile(getProjectPath(exportDirectory), project),
        FileUtil.writeJsonToFile(getApplicationPath(exportDirectory), application),
      ]))
      .then(() => zipDirectory(exportDirectory, zippedFile))
      .then(() => fsPromises.rmdir(exportDirectory, { recursive: true }));
  } catch (err) {
    // TODO LL handle error
    console.log(err);
  }
}

export const importProject = (directory: string) => {
  return unzipper.Open.file(directory)
    .then(dir => Promise.all(_.map(dir.files, file => {
      if (file.path === 'application.json' || file.path === 'project.json') {
        return file.buffer()
      }
    })))
    .then(contents => {
      return Promise.all(_.map(contents, content => JSON.parse(content.toString('utf8'))))
    });
}
