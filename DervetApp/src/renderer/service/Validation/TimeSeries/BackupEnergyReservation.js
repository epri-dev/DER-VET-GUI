import MonthlyDataArray from '@/service/Validation/TimeSeries/MonthlyDataArray';

export default class BackupEnergyReservation extends MonthlyDataArray {
  isRequired(project) {
    return project.objectivesBackupPower;
  }
}
