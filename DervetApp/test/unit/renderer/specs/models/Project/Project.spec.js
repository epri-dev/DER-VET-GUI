import ProjectMetadata from '@/models/Project/Metadata/ProjectMetadata';

describe('Project model', () => {
  const projectMetadata = new ProjectMetadata();

  it('should initialize with a name field', () => {
    expect(projectMetadata.name.displayName).to.eql('Name');
  });
});
