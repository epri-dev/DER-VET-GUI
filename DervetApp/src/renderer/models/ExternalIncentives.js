import { range } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import getCurrentYear from '@/util/time';

export const INCENTIVES_HEADERS = ['Year', 'Tax Credit (nominal $)', 'Other Incentive (nominal $)'];

export class ExternalIncentives {
  constructor(arg) {
    this.id = arg.id;
    this.year = arg.year;
    this.taxCredit = arg.taxCredit;
    this.otherIncentive = arg.otherIncentive;
  }

  static getDefaults() {
    return new ExternalIncentives({
      id: uuidv4(),
      year: getCurrentYear(),
      taxCredit: 0,
      otherIncentive: 0,
    });
  }

  toCsv() {
    // TODO: https://www.npmjs.com/package/objects-to-csv
    return this.id;
  }

  static fromParsedCsv(csv) {
    // TODO validate headers to ensure order of fields is correct
    // TODO make reusable function to be shared between billing pds and external incentives
    let csvValues = csv.slice(1);
    csvValues = csvValues.filter(row => row.length === 3);

    return csvValues.map(row => (
      new ExternalIncentives({
        id: uuidv4(),
        year: row[0],
        taxCredit: row[1],
        otherIncentive: row[2],
      })
    ));
  }
}

export const validation = {
  year: {
    type: Number,
    allowedValues: range(getCurrentYear(), getCurrentYear() + 21),
  },
};
