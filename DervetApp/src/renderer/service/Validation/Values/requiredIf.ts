import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';

export default function requiredIf(metadata: ValueFieldMetadata, collection: any): boolean {
  if (metadata.requiredIf) {
    const { field, condition } = metadata.requiredIf;
    return condition(collection[field]);
  }
  return false;
}
