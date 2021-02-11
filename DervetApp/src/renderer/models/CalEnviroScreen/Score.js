export class CesScore {
  constructor(arg) {
    this.censusTract = arg.censusTract;
    this.county = arg.county;
    this.zipCode = arg.zipCode;
    this.cesScore = arg.cesScore;
    this.cesScorePercentile = arg.cesScorePercentile;
  }
}

export const parsedCsvToCesScores = (csv) => {
  let csvValues = csv.slice(1);
  csvValues = csvValues.filter(row => row.length === 5);

  return csvValues.map(row => (
    new CesScore({
      censusTract: row[0],
      county: row[1],
      zipCode: row[2],
      cesScore: row[3],
      cesScorePercentile: row[4],
    })
  ));
};
