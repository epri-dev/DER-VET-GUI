// Rename this and possibly move to a service?
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';
import { required, decimal, maxValue, minValue, between, integer } from 'vuelidate/lib/validators';

import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { TimeSeriesFieldMetadata } from '@/models/Project/Metadata/TimeSeriesField';

export const isTimeSeriesFieldMetadata = (
  member: any,
): member is TimeSeriesFieldMetadata => (
  member.sampleDataFileName !== undefined
);

export const isValueFieldMetadata = (member: any): member is ValueFieldMetadata => (
  member.type !== undefined
);

export const getFieldKeys = (metadata: object): string[] => keys(metadata);

export const getFieldKeysOfType = (metadata: object, typeCheck: (m: any) => boolean): string[] => (
  reduce(metadata, (result, val, key) => {
    if (typeCheck(val)) { result.push(key); }
    return result;
  }, [])
);

export const getTimeSeriesFieldKeys = (metadata: object): string[] => (
  getFieldKeysOfType(metadata, isTimeSeriesFieldMetadata)
);

export const getValueFieldKeys = (metadata: object): string[] => (
  getFieldKeysOfType(metadata, isValueFieldMetadata)
);

export const getDefaultValue = (metadata: any): any => {
  const d = metadata.defaultValue;
  const typeDefault: any = isTimeSeriesFieldMetadata(metadata) ? [] : null;
  return d === undefined ? typeDefault : d;
};

export const getDefaultValues = (metadata: any, fields?: string[]): object => {
  if (fields === undefined) fields = getFieldKeys(metadata);
  return reduce(fields, (obj: any, f) => {
    obj[f] = getDefaultValue(metadata[f]);
    return obj;
  }, {});
};

export const valueFieldMetadataToValidationSchema = (
  metadata: ValueFieldMetadata,
): object => ({
  ...(metadata.isRequired && { required }),
  ...((metadata.type === Number || metadata.type === 'float') && { decimal }),
  ...(metadata.type === 'int' && { integer }),
  ...(((typeof metadata.minValue) === 'number') && { minValue: minValue(metadata.minValue) }),
  ...(((typeof metadata.maxValue) === 'number') && { maxValue: maxValue(metadata.maxValue) }),
  ...(((typeof metadata.maxValue) === 'number') && ((typeof metadata.minValue) === 'number')
    && { between: between(metadata.minValue, metadata.maxValue) }),
});

export const metadataCollectionToValidationSchema = (metadata: any) => {
  const fields = getValueFieldKeys(metadata);
  return reduce(fields, (result: any, field: string) => {
    result[field] = valueFieldMetadataToValidationSchema(metadata[field]);
    return result;
  }, {});
};
