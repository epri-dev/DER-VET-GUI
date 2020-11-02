import Project from '@/models/Project/Project';

describe('Project model', () => {
  it('should initialize with a null id', () => {
    const actual = Project.getDefaults();
    expect(actual.id).to.eql(null);
  });

  it('should not add an additional validation error if already present in list', () => {
    const actual = new Project({ id: 1 });
    actual.addDistinctValidationError('Foo');
    actual.addDistinctValidationError('Bar');
    actual.addDistinctValidationError('Foo');
    expect(actual.validationErrorList).to.eql(['Foo', 'Bar']);
  });
});
