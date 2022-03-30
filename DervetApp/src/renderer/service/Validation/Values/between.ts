import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import {
  getMaxValueFromMetadata,
  getMinValueFromMetadata,
} from '@/service/Validation/Values/shared';
import { nonEmpty } from '@/util/validation';

export default function between(
  value: any, metadata: ValueFieldMetadata, collection: any,
): boolean {
  const minValue = getMinValueFromMetadata(metadata, collection);
  const maxValue = getMaxValueFromMetadata(metadata, collection);
  return nonEmpty(value)
      && ((maxValue !== null) && (minValue !== null)
      && (value < minValue || value > maxValue));
}
