import { projectMetadata } from '@/models/Project/ProjectMetadata';

describe('Project model', () => {
  it('should initialize with a name field', () => {
    expect(projectMetadata.name.displayName).to.eql('Name');
  });
});
