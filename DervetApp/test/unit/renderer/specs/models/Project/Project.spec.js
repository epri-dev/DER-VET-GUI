import startCase from 'lodash/startCase';
import { projectMetadata } from '@/models/Project/ProjectMetadata';
import * as c from '@/models/Project/constants';

describe('Project model', () => {
  it('should initialize with a name field', () => {
    expect(projectMetadata.name.displayName).to.eql('Name');
  });

  it('should initialize each TS field properly', () => {
    c.TS_ALL.forEach((f) => {
      console.log(f);
      const pm = projectMetadata[f];
      const a = pm.actionSetName;
      const dm = pm.DataModel;
      const ts = new dm([]);
      const page = ts.pageAttributes.page;
      const pageKey = ts.pageAttributes.pageKey;
      const pageGroup = ts.pageAttributes.pageGroup;
      const f0 = f.slice(0, 2);
      let f1 = null;
      let f1page = null;
      let pageIndexEnd = null;
      switch (f) {
        case 'tsNsrPrice':
          pageIndexEnd = 5;
          f1 = (f.slice(2, 5)).toUpperCase();
          f1page = f1;
          break;
        case 'tsDeferralLoad':
          pageIndexEnd = 10;
          f1 = startCase(f.slice(2, 10));
          f1page = f1.toLowerCase();
          break;
        default:
          pageIndexEnd = 4;
          f1 = (f.slice(2, 4)).toUpperCase();
          f1page = f1;
      }
      const expected_a = 'set' + f1 + f.slice(pageIndexEnd);
      const expected_name = f1 + f.slice(pageIndexEnd) + 'TimeSeries';

      expect(a).to.not.eql(undefined);
      expect(f0).to.eql('ts');
      expect(a).to.eql(expected_a);

      expect(dm).to.not.eql(undefined);
      expect(page).to.eql(f1page);
      expect(pageKey).to.eql('objectives');
      expect(pageGroup).to.eql('components');
      expect(dm.name).to.eql(expected_name);

      expect(ts.unit.length).to.be.above(0);
      expect(ts.columnHeaderName.length).to.be.above(0);

      // skip tsFrUpPrice & tsFrDownPrice as they do not contain FR in their columnHeaderName
      if (!['tsFrUpPrice', 'tsFrDownPrice'].includes(f)) {
        expect(ts.columnHeaderName).to.have.string(f1);
      }
    });
  });
});
