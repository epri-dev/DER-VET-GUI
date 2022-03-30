import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { nonEmpty } from '@/util/validation';

export const getMinValueFromMetadata = (metadata: ValueFieldMetadata, collection: any): number => {
  if (nonEmpty(metadata.minValue)) return metadata.minValue;
  if (nonEmpty(metadata.minValueIf)) {
    return metadata.minValueIf.condition(collection[metadata.minValueIf.field]);
  }
  return null;
};

export const getMaxValueFromMetadata = (metadata: ValueFieldMetadata, collection: any): number => {
  if (nonEmpty(metadata.maxValue)) return metadata.maxValue;
  if (nonEmpty(metadata.maxValueIf)) {
    return metadata.maxValueIf.condition(collection[metadata.maxValueIf.field]);
  }
  return null;
};
