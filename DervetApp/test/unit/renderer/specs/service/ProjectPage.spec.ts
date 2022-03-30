import keys from 'lodash/keys';

import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField.ts';
import { TimeSeriesFieldMetadata } from '@/models/Project/Metadata/TimeSeriesField.ts';
import {
  getDefaultValues,
  getFieldKeys,
  getTimeSeriesFieldKeys,
  getValueFieldKeys,
  metadataCollectionToValidationSchema,
  valueFieldMetadataToValidationSchema,
} from '@/service/ProjectPage';
import { makeTestHeader } from '../shared';

describe('Project page service', () => {
  const fooField: ValueFieldMetadata = {
    defaultValue: 1,
    displayName: 'foo',
    isRequired: true,
    minValue: 0,
    type: Number,
  };

  const barField: ValueFieldMetadata = {
    displayName: 'bar',
    isRequired: false,
    type: String,
  };

  const bazField: TimeSeriesFieldMetadata = {
    displayName: 'baz',
    columnHeaderName: 'baz header',
    isMonthly: true,
    sampleDataFileName: 'bazfile',
  };

  const fieldCollection = { fooField, barField, bazField };

  makeTestHeader('-- PROJECT PAGE SERVICE -- ');

  it('should generate a collection of default values', () => {
    const actual = getDefaultValues(fieldCollection);
    expect(actual).to.eql({ fooField: 1, barField: null, bazField: [] });
  });

  it('should generate a collection of default values given a field list', () => {
    const actual = getDefaultValues(fieldCollection, ['fooField']);
    expect(actual).to.eql({ fooField: 1 });
  });

  it('should generate a list of timeseries fields from a metadata collection class', () => {
    const actual = getTimeSeriesFieldKeys(fieldCollection);
    expect(actual).to.eql(['bazField']);
  });

  it('should generate a list of value fields from a metadata collection class', () => {
    const actual = getValueFieldKeys(fieldCollection);
    expect(actual).to.eql(['fooField', 'barField']);
  });

  it('should generate a list of fields from a metadata collection class', () => {
    const actual = getFieldKeys(fieldCollection);
    expect(actual).to.eql(['fooField', 'barField', 'bazField']);
  });

  it('should generate a validation schema from value field metadata', () => {
    const actual = valueFieldMetadataToValidationSchema(fooField);
    const expectedKeys = ['required', 'decimal', 'minValue'];
    expect(keys(actual)).to.eql(expectedKeys);
  });

  it('should generate a validation schema from value field metadata', () => {
    const actual = metadataCollectionToValidationSchema(fieldCollection);
    expect(keys(actual)).to.eql(['fooField', 'barField']);
    expect(keys(actual.barField)).to.eql([]);
  });
});
