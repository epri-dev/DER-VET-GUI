import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { nonEmpty } from '@/util/validation';

// Returns true if there is an error
export default function decimal(value: any, metadata: ValueFieldMetadata): boolean {
  return nonEmpty(value)
         && (metadata.type === Number || metadata.type === 'float') && !(/^[-]?\d*(\.\d+)?$/.test(value));
}
