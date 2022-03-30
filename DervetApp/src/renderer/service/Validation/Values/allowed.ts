import _ from 'lodash';

import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { nonEmpty } from '@/util/validation';

export default function allowed(value: any, metadata: ValueFieldMetadata): boolean {
  const { allowedValues } = metadata;
  return nonEmpty(value)
         && (nonEmpty(allowedValues) && !_.includes(_.map(allowedValues, 'value'), value));
}
