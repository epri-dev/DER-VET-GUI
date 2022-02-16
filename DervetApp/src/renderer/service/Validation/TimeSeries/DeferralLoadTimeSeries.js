import DataArray from '@/service/Validation/TimeSeries/DataArray';

class DeferralLoadTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesDeferral;
  }
}

export default DeferralLoadTimeSeries;
