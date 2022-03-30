import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { getMinValueFromMetadata } from '@/service/Validation/Values/shared';
import { nonEmpty } from '@/util/validation';

export default function min(value: any, metadata: ValueFieldMetadata, collection: any): boolean {
  const minValue = getMinValueFromMetadata(metadata, collection);
  return nonEmpty(value) && ((minValue !== null) && value < minValue);
}
