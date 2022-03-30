import _ from 'lodash';

import Page from '@/models/Application/Page';
import application from '@/store/modules/Application';
import { CollectionType } from '@/models/Project/CollectionType';
import { getDefaultApplicationState } from '@/util/application';
import { makeTestHeader } from '../shared';

const { mutations } = application;

describe('Application mutations', () => {
  makeTestHeader('-- APPLICATION MUTATIONS -- ');

  const state: any = getDefaultApplicationState(false);
  const locError: any = { loc: 'this is loc error' };

  it('should set a collection item page status', () => {
    const payload = {
      page: CollectionType.SolarPV,
      id: 'foo',
      pageStatus: {
        errors: locError,
        submitted: true,
      },
    };

    const expected = {
      errors: locError,
      submitted: true,
    };

    mutations.SET_PAGE_STATUS(state, payload);
    expect(state.pageStatus[CollectionType.SolarPV].foo).to.eql(expected);
  });

  it('should remove a collection item page status', () => {
    const solarState = {
      pageStatus: {
        [CollectionType.SolarPV]: {
          foo: { errors: locError, submitted: true },
        },
      },
    };
    const payload = { page: CollectionType.SolarPV, id: 'foo' };
    mutations.REMOVE_COLLECTION_PAGE_STATUS(solarState, payload);
    expect(solarState.pageStatus[CollectionType.SolarPV].foo).to.eql(undefined);
  });

  it('should set many collection items\' page status', () => {
    const pageStatus: any = { errors: {}, submitted: false };
    const payload: any = {
      collectionType: CollectionType.SolarPV,
      pageStatusSet: { foo: pageStatus, bar: pageStatus },
    };
    mutations.SET_MANY_COLLECTION_PAGE_STATUS(state, payload);
    expect(state.pageStatus[CollectionType.SolarPV].foo).to.eql(pageStatus);
    expect(state.pageStatus[CollectionType.SolarPV].bar).to.eql(pageStatus);
  });

  it('should merge a page status', () => {
    const state = {
      pageStatus: {
        [Page.ObjectivesLF]: {
          errors: { lfDuration: 'lfDuration error' }, submitted: true,
        },
        [Page.Financial]: {
          errors: {}, submitted: true,
        },
      },
    };

    const payload = {
      [Page.ObjectivesLF]: {
        errors: { tsLfEOU: 'its all wrong' },
      },
    };

    const expectedDaErrors = { lfDuration: 'lfDuration error', tsLfEOU: 'its all wrong' };

    mutations.MERGE_PAGE_STATUS(state, payload);
    expect(state.pageStatus[Page.ObjectivesLF].submitted).to.eql(true);
    expect(state.pageStatus[Page.ObjectivesLF].errors).to.eql(expectedDaErrors);
    expect(_.keys(state.pageStatus)).to.eql([Page.ObjectivesLF, Page.Financial]);
  });

  it('should merge a page status where the new timeseries errors are empty', () => {
    const state = {
      pageStatus: {
        [Page.ObjectivesLF]: {
          errors: {
            tsLfEOU: 'tsLfEOU is invalid',
          },
          submitted: true,
        },
      },
    };

    const payload = {
      [Page.ObjectivesLF]: {
        errors: {},
      },
    };

    mutations.MERGE_PAGE_STATUS(state, payload);
    expect(state.pageStatus[Page.ObjectivesLF].errors).to.eql({});
  });

  it('should overwrite timeseries errors with new ones', () => {
    const state = {
      pageStatus: {
        [Page.ObjectivesLF]: {
          errors: {
            tsLfEOU: 'tsLfEOU is invalid',
            tsLfEOD: 'tsLfEOD is invalid too',
            lfDuration: 'lfDuration is invalid',
          },
          submitted: true,
        },
      },
    };

    const payload = {
      [Page.ObjectivesLF]: {
        errors: {
          tsLfEOU: 'tsLfEOU is invalid in another way',
        },
      },
    };

    const expectedErrors = {
      tsLfEOU: 'tsLfEOU is invalid in another way',
      lfDuration: 'lfDuration is invalid',
    };

    mutations.MERGE_PAGE_STATUS(state, payload);
    expect(state.pageStatus[Page.ObjectivesLF].errors).to.eql(expectedErrors);
  });
});
