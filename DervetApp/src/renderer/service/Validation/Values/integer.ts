import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { nonEmpty } from '@/util/validation';

export default function integer(value: any, metadata: ValueFieldMetadata): boolean {
  return nonEmpty(value) && (metadata.type === 'int' && !(/(^[0-9]*$)|(^-[0-9]+$)/.test(value)));
}
