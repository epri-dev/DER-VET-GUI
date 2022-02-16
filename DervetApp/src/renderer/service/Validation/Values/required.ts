import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import requiredIf from '@/service/Validation/Values/requiredIf';
import { empty } from '@/util/validation';

export default function required(
  value: any, metadata: ValueFieldMetadata, collection: any,
): boolean {
  return (metadata.isRequired || requiredIf(metadata, collection)) && empty(value);
}
