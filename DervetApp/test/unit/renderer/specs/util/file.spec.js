import { getRootDirectoryFromWebkitEvent } from '@/util/file';
import path from 'path';

const SEP = path.sep;

describe(`util${SEP}file`, () => {

  it('should get the root from a directory select event', () => {
    const file = {
      path: `${SEP}Users${SEP}foo${SEP}Desktop${SEP}$RECYCLE.BIN${SEP}desktop.ini`,
      webkitRelativePath: `Desktop${SEP}$RECYCLE.BIN${SEP}desktop.ini`,
    };
    const actual = getRootDirectoryFromWebkitEvent(file);
    const expected = `${SEP}Users${SEP}foo${SEP}Desktop`;
    expect(actual).to.equal(expected);
  });

  it('should get the root from a directory select event with repeating directory names', () => {
    const file = {
      path: `${SEP}Users${SEP}$RECYCLE.BIN${SEP}foo${SEP}Desktop${SEP}$RECYCLE.BIN${SEP}desktop.ini`,
      webkitRelativePath: `Desktop${SEP}$RECYCLE.BIN${SEP}desktop.ini`,
    };
    const actual = getRootDirectoryFromWebkitEvent(file);
    const expected = `${SEP}Users${SEP}$RECYCLE.BIN${SEP}foo${SEP}Desktop`;
    expect(actual).to.equal(expected);
  });
});
