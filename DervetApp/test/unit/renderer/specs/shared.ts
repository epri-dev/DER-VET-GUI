export const makeTestHeader = (header: string) => {
  it(header, () => {
    expect(true).to.equal(true);
  });
};

export const TEST_HEADER = 'TEST_HEADER';
