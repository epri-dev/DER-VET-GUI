import * as Logic from '@/util/logic';

describe('util/logic', () => {
  it('should return a Boolean for every function call', () => {
    expect(typeof Logic.isNumeric('')).to.equal('boolean');
    expect(typeof Logic.isValueInRange(2, -2, 2)).to.equal('boolean');
    expect(typeof Logic.isObjectOfLengthZero({})).to.equal('boolean');
    expect(typeof Logic.isNotNullAndNotUndefined(null)).to.equal('boolean');
  });

  it('should return non-numeric strings as false with isNumeric', () => {
    expect(Logic.isNumeric('')).to.equal(false);
    expect(Logic.isNumeric(' ')).to.equal(false);
    expect(Logic.isNumeric('345z')).to.equal(false);
    expect(Logic.isNumeric('345 z')).to.equal(false);
    expect(Logic.isNumeric('/3')).to.equal(false);
    expect(Logic.isNumeric('\\3')).to.equal(false);
    expect(Logic.isNumeric(',')).to.equal(false);
    expect(Logic.isNumeric('--33')).to.equal(false);
    expect(Logic.isNumeric('++33')).to.equal(false);
    expect(Logic.isNumeric('4+6')).to.equal(false);
    expect(Logic.isNumeric('a')).to.equal(false);
    expect(Logic.isNumeric(null)).to.equal(false);
    expect(Logic.isNumeric('2e3.3')).to.equal(false);
    expect(Logic.isNumeric('2e0.')).to.equal(false);
    expect(Logic.isNumeric('2e0.0')).to.equal(false);
    expect(Logic.isNumeric('3e')).to.equal(false);
    expect(Logic.isNumeric('e4')).to.equal(false);
  });

  it('should return proper scientific notation strings as true with isNumeric', () => {
    expect(Logic.isNumeric('3e3')).to.equal(true);
    expect(Logic.isNumeric('3e3')).to.equal(true);
    expect(Logic.isNumeric('1e7')).to.equal(true);
    expect(Logic.isNumeric('2e0')).to.equal(true);
    expect(Logic.isNumeric('0.5e3')).to.equal(true);
    expect(Logic.isNumeric('1e-3')).to.equal(true);
    expect(Logic.isNumeric('-5e-3')).to.equal(true);
  });
});
