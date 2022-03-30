import MonthlyDataArray from '@/service/Validation/TimeSeries/MonthlyDataArray';

export default class BackupEnergyPrice extends MonthlyDataArray {
  isRequired(project) {
    return project.objectivesBackupPower;
  }
}
