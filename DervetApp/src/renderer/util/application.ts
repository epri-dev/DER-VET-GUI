import _ from 'lodash';

import Page from '@/models/Application/Page';
import PageMetadata, { SinglePageMetadata } from '@/models/Application/PageMetadata';
import { CollectionType } from '@/models/Project/CollectionType';
import ValidationService from '@/service/Validation/ValidationService';

export const defaultPageStatus = (submitted: boolean) => ({ errors: {}, submitted });

// Use iterate!
export const getDefaultApplicationState = (submitted: boolean) => {
  const defaultCollections = _.reduce(CollectionType, (result: any, type: CollectionType) => {
    result[type] = {};
    return result;
  }, {});
  delete defaultCollections[CollectionType.Project];

  const defaultPages = _.reduce(Page, (result: any, page: Page) => {
    result[page] = defaultPageStatus(submitted);
    return result;
  }, {});

  return {
    pageStatus: {
      ...defaultPages,
      ...defaultCollections,
    },
    dervetRunError: false,
    resultsLoaded: false,
    runInProgress: false,
  };
};

// TODO move to application model plz
export interface PageStatus {
  errors?: any; // TODO fix, non-optional
  submitted?: boolean;
}

// TODO move to project model plz
export interface CollectionItem {
  active: boolean;
  id: string;
  values: any;
}

interface ProjectCallback {
  (singlePageMeta: SinglePageMetadata): PageStatus
}

interface CollectionCallback {
  (collectionItem: CollectionItem): PageStatus
}

export const iterateThroughApplicationState = (
  project: any, projectCb: ProjectCallback, collectionCb: CollectionCallback,
) => {
  const pageMetadata = new PageMetadata(project);
  const pageResult = _.reduce(Page, (result: any, page: Page) => {
    result[page] = projectCb(pageMetadata.getSinglePage(page));
    return result;
  }, {});

  const collectionResult = _.reduce(CollectionType, (
    result: any, collectionType: CollectionType,
  ) => {
    if (collectionType !== CollectionType.Project) {
      result[collectionType] = {};
      _.each(project[collectionType], (collectionItem) => {
        result[collectionType][collectionItem.id] = collectionCb(collectionItem);
      });
    }
    return result;
  }, {});

  return _.merge(pageResult, collectionResult);
};

export const generateSubmitted = (project: any) => {
  const pageCb = (meta: SinglePageMetadata) => ({ submitted: meta.active });
  // TODO better solution: this is setting submitted true if item.active is undefined
  // which is the case for a non-technology collection item
  const collectionCb = (item: CollectionItem) => ({ submitted: item.active !== false });
  return iterateThroughApplicationState(project, pageCb, collectionCb);
};

export const generateApplicationStateFromProject = (project: any) => {
  const defaultState = getDefaultApplicationState(true);
  const errors = ValidationService.validate(project);
  const submitted = generateSubmitted(project);
  const pageStatus = _.merge(errors, submitted);
  const result = _.merge(defaultState, { pageStatus });
  return result;
};

export default generateApplicationStateFromProject;
