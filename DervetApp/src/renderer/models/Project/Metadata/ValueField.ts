import { AllowedValue } from '@/models/Project/Metadata/AllowedValues/AllowedValue';
import { FieldMetadata } from '@/models/Project/Metadata/FieldMetadata';
import { ValueCondition } from '@/models/Project/Metadata/Shared';

export interface ValueFieldMetadata extends FieldMetadata {
  allowedValues?: AllowedValue[];
  description?: string;
  minValue?: number;
  minValueIf?: ValueCondition;
  maxValue?: number;
  maxValueIf?: ValueCondition;
  type: object | string;
}
