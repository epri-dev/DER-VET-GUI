import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class LFEnergyOptionDownTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesLF;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueBetweenXAndY(0, 1).errorMsg];
  }
}
