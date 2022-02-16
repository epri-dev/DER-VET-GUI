import _ from 'lodash';

import { SinglePageMetadata } from '@/models/Application/PageMetadata';
import { iterateThroughApplicationState } from '@/util/application';
import TimeSeriesValidationFactory, { isTimeSeries } from '@/service/Validation/TimeSeries/Factory';

export default class ValidationService {
  static validate(project: any): any {
    const pageCallback = (meta: SinglePageMetadata) => (
      meta.active ? ({
        errors: this.validateTimeSeriesFieldsInList(meta.fields, project, project),
      }) : { errors: {} }
    );

    const collectionCallback = (collection: any) => {
      if (collection.active !== false) {
        const fields = _.keys(collection.values);
        return {
          errors: this.validateTimeSeriesFieldsInList(fields, collection.values, project),
        };
      }
      return {};
    };

    return iterateThroughApplicationState(project, pageCallback, collectionCallback);
  }

  static validateTimeSeriesFieldsInList(fields: string[], collection: any, project: any) {
    return _.reduce(fields, (result: any, field: string) => {
      const value = collection[field];
      if (isTimeSeries(field)) {
        const tsValidation = this.validateTimeSeriesField(field, value, project);
        if (tsValidation) result[field] = tsValidation;
      }
      return result;
    }, {});
  }

  static validateTimeSeriesField(field: string, value: any, project: any): string {
    const ValidationClass = TimeSeriesValidationFactory.get(field);
    const validation = new ValidationClass(value);
    return validation.validate(project);
  }
}
