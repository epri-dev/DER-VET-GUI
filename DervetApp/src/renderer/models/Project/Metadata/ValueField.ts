import { FieldMetadata } from '@/models/Project/Metadata/FieldMetadata';
import { ValueCondition } from '@/models/Project/Metadata/Shared';

export interface ValueFieldMetadata extends FieldMetadata {
  allowedValues?: any[];
  description?: string;
  minValue?: number;
  minValueIf?: ValueCondition;
  maxValue?: number;
  maxValueIf?: ValueCondition;
  type: object | string;
}
