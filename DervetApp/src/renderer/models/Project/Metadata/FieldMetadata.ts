// Rename file: FieldMetadata.ts -> Field.ts
import { Condition } from '@/models/Project/Metadata/Shared';

export interface FieldMetadata {
  defaultValue?: any;
  displayName?: string;
  isRequired?: boolean; // TODO rename required
  requiredIf?: Condition;
  unit?: string;
}
