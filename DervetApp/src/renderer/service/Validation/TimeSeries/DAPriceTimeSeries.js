import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class DAPriceTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesDA;
  }

  extraValidate(project) {
    // Disallow negative energy prices when DER-VET sizing is ON (this is a back-end only feature)
    if (project.sizingEquipment === true) return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
    return [];
  }
}
