import { projectMetadata } from '@/models/Project/Project';

describe('Project model', () => {
  it('should initialize with a name field', () => {
    expect(projectMetadata.name.displayName).to.eql('Name');
  });
});
