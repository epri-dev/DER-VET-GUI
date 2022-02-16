import _ from 'lodash';

import CollectionTypes from '@/models/Project/CollectionTypes';
import MetadataFactory from '@/models/Project/Metadata/Factory';
import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import {
  allowed,
  between,
  decimal,
  integer,
  min,
  max,
  required,
} from '@/service/Validation/Values/index';
import {
  getMaxValueFromMetadata,
  getMinValueFromMetadata,
} from '@/service/Validation/Values/shared';
import {
  requiredMsg,
  decimalMsg,
  integerMsg,
  betweenMsg,
  maxMsg,
  minMsg,
  allowedMsg,
} from '@/service/Validation/Values/messages';

export const validateValueField = (
  value: any, metadata: ValueFieldMetadata, collection: any,
): string => {
  const maxValue = getMaxValueFromMetadata(metadata, collection);
  const minValue = getMinValueFromMetadata(metadata, collection);
  const { displayName, allowedValues } = metadata;

  if (required(value, metadata, collection)) return requiredMsg(displayName);
  if (decimal(value, metadata)) return decimalMsg(displayName);
  if (integer(value, metadata)) return integerMsg(displayName);
  if (between(value, metadata, collection)) return betweenMsg(displayName, minValue, maxValue);
  if (max(value, metadata, collection)) return maxMsg(displayName, minValue);
  if (min(value, metadata, collection)) return minMsg(displayName, minValue);
  if (allowed(value, metadata)) return allowedMsg(displayName, allowedValues);

  return '';
};

export const validateCollection = (
  type: CollectionTypes, values: any[],
): any => {
  const metadata: {[index: string]: any} = MetadataFactory.getMetadata(type);

  return _.reduce(values, (res: any, collectionItem: any) => {
    res[collectionItem.id] = _.reduce(collectionItem.values, (
      itemRes: any, value: any, fieldName: string,
    ) => {
      const foo: any = validateValueField(value, metadata[fieldName], collectionItem.values);
      if (foo !== '') itemRes[fieldName] = foo;
      return itemRes;
    }, {});
    return res;
  }, {});
};

export const formatForPageStatus = (errors: any) => (
  _.reduce(errors, (res: {[index: string]: any}, item: any, id: any) => {
    res[id] = {
      errors: item,
      submitted: true,
    };
    return res;
  }, {})
);
