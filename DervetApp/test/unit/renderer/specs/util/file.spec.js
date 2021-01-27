import { getRootDirectoryFromWebkitEvent } from '@/util/file';

describe('project getters', () => {
  it('should get the root from a directory select event', () => {
    const file = {
      path: '/Users/foo/Desktop/$RECYCLE.BIN/desktop.ini',
      webkitRelativePath: 'Desktop/$RECYCLE.BIN/desktop.ini',
    };
    const actual = getRootDirectoryFromWebkitEvent(file);
    const expected = '/Users/foo/Desktop';
    expect(actual).to.equal(expected);
  });

  it('should get the root from a directory select event with repeating directory names', () => {
    const file = {
      path: '/Users/$RECYCLE.BIN/foo/Desktop/$RECYCLE.BIN/desktop.ini',
      webkitRelativePath: 'Desktop/$RECYCLE.BIN/desktop.ini',
    };
    const actual = getRootDirectoryFromWebkitEvent(file);
    const expected = '/Users/$RECYCLE.BIN/foo/Desktop';
    expect(actual).to.equal(expected);
  });
});
