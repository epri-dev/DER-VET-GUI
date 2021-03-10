import startCase from 'lodash/startCase';
import { projectMetadata } from '@/models/Project/ProjectMetadata';
import * as c from '@/models/Project/constants';

describe('Project model', () => {
  it('should initialize with a name field', () => {
    expect(projectMetadata.name.displayName).to.eql('Name');
  });

  it('should initialize each TS field properly', () => {
    c.TS_ALL.forEach((f) => {
      // console.log(f);
      const pm = projectMetadata[f];
      const a = pm.actionSetName;
      const Dm = pm.DataModel;
      const ts = new Dm([]);
      const { page } = ts.pageAttributes;
      const { pageKey } = ts.pageAttributes;
      const { pageGroup } = ts.pageAttributes;
      const f0 = f.slice(0, 2);
      let f1 = null;
      let f1page = null;
      let pageIndexEnd = null;
      let expectedA = null;
      let expectedName = null;
      switch (f) {
        case 'tsCriticalLoad':
          pageIndexEnd = 8;
          f1 = startCase(f.slice(2, pageIndexEnd));
          f1page = 'resilience';
          break;
        case 'tsDeferralLoad':
          pageIndexEnd = 10;
          f1 = startCase(f.slice(2, pageIndexEnd));
          f1page = f1.toLowerCase();
          break;
        case 'tsNsrPrice':
          pageIndexEnd = 5;
          f1 = (f.slice(2, pageIndexEnd)).toUpperCase();
          f1page = f1;
          break;
        case 'tsSiteLoad':
          pageIndexEnd = 6;
          f1 = startCase(f.slice(2, pageIndexEnd));
          f1page = `${f1.toLowerCase()}Information`;
          break;
        case 'tsSystemLoad':
          pageIndexEnd = 8;
          f1 = startCase(f.slice(2, pageIndexEnd));
          f1page = `${f1.toLowerCase()}Information`;
          break;
        case 'tsUserEnergyMax':
          pageIndexEnd = 6;
          f1 = startCase(f.slice(2, pageIndexEnd));
          f1page = `${f1.toLowerCase()}Defined`;
          break;
        case 'tsUserEnergyMin':
          pageIndexEnd = 6;
          f1 = startCase(f.slice(2, pageIndexEnd));
          f1page = `${f1.toLowerCase()}Defined`;
          break;
        case 'tsUserPowerMax':
          pageIndexEnd = 6;
          f1 = startCase(f.slice(2, pageIndexEnd));
          f1page = `${f1.toLowerCase()}Defined`;
          break;
        case 'tsUserPowerMin':
          pageIndexEnd = 6;
          f1 = startCase(f.slice(2, pageIndexEnd));
          f1page = `${f1.toLowerCase()}Defined`;
          break;
        default:
          pageIndexEnd = 4;
          f1 = (f.slice(2, pageIndexEnd)).toUpperCase();
          f1page = f1;
      }
      // console.log(f1, f1page);
      if (['tsLfEOU', 'tsLfEOD'].includes(f)) {
        expectedA = `set${f1}${f.slice(pageIndexEnd).toLowerCase()}`;
        const upOrDown = (f === 'tsLfEOU') ? 'Up' : 'Down';
        expectedName = `${f1}EnergyOption${upOrDown}TimeSeries`;
      } else {
        expectedA = `set${f1}${f.slice(pageIndexEnd)}`;
        expectedName = `${f1}${f.slice(pageIndexEnd)}TimeSeries`;
      }

      expect(a).to.not.eql(undefined);
      expect(f0).to.eql('ts');
      expect(a).to.eql(expectedA);

      expect(Dm).to.not.eql(undefined);
      expect(page).to.eql(f1page);
      expect(pageKey).to.eql('objectives');
      expect(pageGroup).to.eql('components');
      expect(Dm.name).to.eql(expectedName);

      expect(ts.unit.length).to.be.above(0);
      expect(ts.columnHeaderName.length).to.be.above(0);

      // skip ts with more complex columnHeaderNames
      if (!['tsFrUpPrice', 'tsFrDownPrice', 'tsUserEnergyMax', 'tsUserEnergyMin',
        'tsUserPowerMax', 'tsUserPowerMin'].includes(f)) {
        expect(ts.columnHeaderName).to.have.string(f1);
      }
    });
  });
});
