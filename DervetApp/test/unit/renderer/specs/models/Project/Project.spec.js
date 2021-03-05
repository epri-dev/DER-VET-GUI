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
      const f2 = f.slice(0, 2);
      const f4 = (f.slice(2, 4)).toUpperCase();
      const expected_a = 'set' + f4 + f.slice(4);
      const expected_name = f4 + f.slice(4) + 'TimeSeries';

      expect(a).to.not.eql(undefined);
      expect(f2).to.eql('ts');
      expect(a).to.eql(expected_a);

      // objectives
      expect(dm).to.not.eql(undefined);
      expect(page).to.eql(f4);
      expect(pageKey).to.eql('objectives');
      expect(pageGroup).to.eql('components');
      expect(dm.name).to.eql(expected_name);

      expect(ts.unit.length).to.be.above(0);
      expect(ts.columnHeaderName.length).to.be.above(0);

      // skip tsFrUpPrice & tsFrDownPrice as they do not contain FR in their columhHeaderName
      if (!['tsFrUpPrice', 'tsFrDownPrice'].includes(f)) {
        expect(ts.columnHeaderName).to.have.string(f4);
      }
    });
  });
});
