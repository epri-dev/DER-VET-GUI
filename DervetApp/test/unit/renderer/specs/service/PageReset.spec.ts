// import fs from 'fs';
import resetInactiveValues from '@/service/ProjectReset';
import { makeTestHeader } from '../shared';

describe('Page Reset', () => {
  makeTestHeader('-- PAGE RESET-- ');

  const projectFixture: any = {
    objectivesDA: false,
    daGrowth: 2,
    tsDaPrice: [1, 2, 3],
  };

  it('should reset values to default for inactive pages', () => {
    const actual = resetInactiveValues(projectFixture);
    expect(actual.tsDaPrice).to.eql([]);
    expect(actual.daGrowth).to.eql(null);
  });
});
