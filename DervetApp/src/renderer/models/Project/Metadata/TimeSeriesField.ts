import { FieldMetadata } from '@/models/Project/Metadata/FieldMetadata';

export interface TimeSeriesFieldMetadata extends FieldMetadata {
  columnHeaderName: string;
  isMonthly: boolean;
  pageAttributes?: object; // TODO move to a lookup table mapping page to list of project keys
  sampleDataFileName: string;
  tsName?: string; // TODO refactor to remove
  error?: string; // TODO refactor to remove
}
