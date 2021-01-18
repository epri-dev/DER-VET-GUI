import fs from 'fs';
import path from 'path';

// import { zipDirectory } from '@/service/FileZipper';
import * as FileUtil from '@/util/file';

const getApplicationPath = (directory: string) => path.join(directory, 'application.json');

const getProjectPath = (directory: string) => path.join(directory, 'project.json');

export const exportProject = (directory: string, project: Project, application: object) => {
  try {
    const exportDirectory = path.join(directory, project.name);
    const zippedExportDirectory = path.join(exportDirectory, '.zip');
    FileUtil.createDirectory(exportDirectory);

    return Promise.all([
      FileUtil.writeJsonToFile(getProjectPath(exportDirectory), project),
      FileUtil.writeJsonToFile(getApplicationPath(exportDirectory), application),
    ]);

    // TODO Get zip working
    // fileWritePromises
    //   .then(() => {
    //     zipDirectory(exportDirectory, zippedExportDirectory);
    //   });
  } catch (err) {
    // TODO LL handle error
    console.log(err);
  }
}

export const importProject = (directory: string) => {
  // TODO unzip zip file argument into directory

  const projectPath = getProjectPath(directory);
  const applicationPath = getApplicationPath(directory);

  // TODO add serialization here
  const projectPromise = FileUtil.readJsonFromFile(projectPath);
  const applicationPromise = FileUtil.readJsonFromFile(applicationPath);

  return Promise.all([projectPromise, applicationPromise]);
}
