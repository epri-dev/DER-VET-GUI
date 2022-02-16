import DataArray from '@/service/Validation/TimeSeries/DataArray';
import { includeSystemLoad } from '@/util/project';

export default class SystemLoadTimeSeries extends DataArray {
  isRequired(project) {
    return includeSystemLoad(project);
  }
}
