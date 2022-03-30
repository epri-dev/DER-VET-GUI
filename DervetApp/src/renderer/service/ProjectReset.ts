import _ from 'lodash';

import PageMetadata from '@/models/Application/PageMetadata';
import ProjectMetadata from '@/models/Project/Metadata/ProjectMetadata';
import { getDefaultValues } from '@/service/ProjectPage';

const resetInactiveValues = (project: any): any => {
  const pageMetadata = new PageMetadata(project);
  const projectMetadata = new ProjectMetadata();
  let result = _.cloneDeep(project);

  _.each(pageMetadata.pages, page => {
    if (page.active === false) {
      const defaultValues = getDefaultValues(projectMetadata, page.fields);
      result = _.assignIn(result, defaultValues);
    }
  });

  return result;
};

export default resetInactiveValues;
