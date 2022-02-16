import application from '@/store/modules/Application';
import CollectionTypes from '@/models/Project/CollectionTypes.ts';
import { makeTestHeader } from '../shared';

const { getters } = application;

describe('Application getters', () => {
  makeTestHeader('-- APPLICATION GETTERS -- ');

  const locError = { loc: 'i am loc error' };

  const errorSubmittedStatus = {
    errors: locError,
    submitted: true,
  };

  const noErrorSubmittedStatus: any = {
    errors: [],
    submitted: true,
  };

  const errorState = {
    pageStatus: {
      [CollectionTypes.SolarPV]: {
        foo: errorSubmittedStatus,
      },
    },
  };

  const noErrorState = {
    pageStatus: {
      [CollectionTypes.SolarPV]: {
        foo: noErrorSubmittedStatus,
      },
    },
  };

  it('should get page status for a collection item', () => {
    const actual = getters.getPageStatus(errorState)(CollectionTypes.SolarPV, 'foo');
    expect(actual).to.equal(errorSubmittedStatus);
  });

  it('should tell whether page is complete for a collectionItem', () => {
    const actualNotComplete = getters.isPageComplete(errorState)(CollectionTypes.SolarPV, 'foo');
    const actualComplete = getters.isPageComplete(noErrorState)(CollectionTypes.SolarPV, 'foo');
    expect(actualNotComplete).to.equal(false);
    expect(actualComplete).to.equal(true);
  });

  it('should get page errors for a collection item', () => {
    const actualError = getters.getPageErrors(errorState)(CollectionTypes.SolarPV, 'foo');
    expect(actualError.loc).to.eql('i am loc error');
  });
});
