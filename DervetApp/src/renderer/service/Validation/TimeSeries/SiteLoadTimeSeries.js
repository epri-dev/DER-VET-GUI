import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class SiteLoadTimeSeries extends DataArray {
  isRequired(project) {
    return (
      project.objectivesRetailDemandChargeReduction || project.objectivesRetailEnergyChargeReduction
    );
  }
}
