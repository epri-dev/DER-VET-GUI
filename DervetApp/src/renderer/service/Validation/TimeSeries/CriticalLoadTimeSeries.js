import DataArray from '@/service/Validation/TimeSeries/DataArray';

class CriticalLoadTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesResilience;
  }
}

export default CriticalLoadTimeSeries;
