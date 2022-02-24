import _ from 'lodash';

import generateApplicationStateFromProject from '@/util/application';
import projectFixture from '../fixtures/models/dto/projectFixture.js';
import { makeTestHeader } from '../shared';

describe('util/application', () => {
  makeTestHeader('-- APPLICATION UTIL -- ');

  it('should generate application state from a project', () => {
    const actual = generateApplicationStateFromProject(projectFixture);
    expect(_.keys(actual)).to.have.lengthOf(4);
    expect(_.keys(actual.pageStatus)).to.have.lengthOf(27);
  });
});
