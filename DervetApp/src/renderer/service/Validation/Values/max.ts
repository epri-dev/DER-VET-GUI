import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { getMaxValueFromMetadata } from '@/service/Validation/Values/shared';
import { nonEmpty } from '@/util/validation';

export default function max(value: any, metadata: ValueFieldMetadata, collection: any): boolean {
  const maxValue = getMaxValueFromMetadata(metadata, collection);
  return nonEmpty(value) && ((maxValue !== null) && value > maxValue);
}
