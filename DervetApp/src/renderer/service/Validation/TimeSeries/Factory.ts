import _ from 'lodash';

import BackupEnergyPrice from '@/service/Validation/TimeSeries/BackupEnergyPrice';
import BackupEnergyReservation from '@/service/Validation/TimeSeries/BackupEnergyReservation';
import ControllableLoadTimeSeries from '@/service/Validation/TimeSeries/ControllableLoadTimeSeries';
import CriticalLoadTimeSeries from '@/service/Validation/TimeSeries/CriticalLoadTimeSeries';
import DAPriceTimeSeries from '@/service/Validation/TimeSeries/DAPriceTimeSeries';
import DRCapacityPriceMonthly from '@/service/Validation/Monthly/DRCapacityPriceMonthly';
import DRMonthsAppliedMonthly from '@/service/Validation/Monthly/DRMonthsAppliedMonthly';
import DRCapacityReservationMonthly from '@/service/Validation/Monthly/DRCapacityReservationMonthly';
import DREnergyPriceMonthly from '@/service/Validation/Monthly/DREnergyPriceMonthly';
import DeferralLoadTimeSeries from '@/service/Validation/TimeSeries/DeferralLoadTimeSeries';
import FleetEVBaselineLoadTimeSeries from '@/service/Validation/TimeSeries/FleetEVBaselineLoadTimeSeries';
import FRPriceTimeSeries from '@/service/Validation/TimeSeries/FRPriceTimeSeries';
import FRDownPriceTimeSeries from '@/service/Validation/TimeSeries/FRDownPriceTimeSeries';
import FRUpPriceTimeSeries from '@/service/Validation/TimeSeries/FRUpPriceTimeSeries';
import LFDownPriceTimeSeries from '@/service/Validation/TimeSeries/LFDownPriceTimeSeries';
import LFEnergyOptionDownTimeSeries from '@/service/Validation/TimeSeries/LFEnergyOptionDownTimeSeries';
import LFEnergyOptionUpTimeSeries from '@/service/Validation/TimeSeries/LFEnergyOptionUpTimeSeries';
import LFPriceTimeSeries from '@/service/Validation/TimeSeries/LFPriceTimeSeries';
import LFUpPriceTimeSeries from '@/service/Validation/TimeSeries/LFUpPriceTimeSeries';
import NSRPriceTimeSeries from '@/service/Validation/TimeSeries/NSRPriceTimeSeries';
import SiteLoadTimeSeries from '@/service/Validation/TimeSeries/SiteLoadTimeSeries';
import PVGenerationTimeSeries from '@/service/Validation/TimeSeries/PVGenerationTimeSeries';
import SRPriceTimeSeries from '@/service/Validation/TimeSeries/SRPriceTimeSeries';
import SystemLoadTimeSeries from '@/service/Validation/TimeSeries/SystemLoadTimeSeries';
import RAActiveTimeSeries from '@/service/Validation/TimeSeries/RAActiveTimeSeries';
import RACapacityPriceMonthly from '@/service/Validation/Monthly/RACapacityPriceMonthly';
import UserEnergyMaxTimeSeries from '@/service/Validation/TimeSeries/UserEnergyMaxTimeSeries';
import UserEnergyMinTimeSeries from '@/service/Validation/TimeSeries/UserEnergyMinTimeSeries';
import UserPowerExportMaxTimeSeries from '@/service/Validation/TimeSeries/UserPowerExportMaxTimeSeries';
import UserPowerExportMinTimeSeries from '@/service/Validation/TimeSeries/UserPowerExportMinTimeSeries';
import UserPowerImportMaxTimeSeries from '@/service/Validation/TimeSeries/UserPowerImportMaxTimeSeries';
import UserPowerImportMinTimeSeries from '@/service/Validation/TimeSeries/UserPowerImportMinTimeSeries';

// todo use constants and disable ts rule
export enum TimeSeriesTypes {
  BackupEnergyPrice = 'mtsBackupEnergyPrice',
  BackupEnergyReservation = 'mtsBackupEnergyReservation',
  ControllableLoad = 'tsControllableLoadProfile',
  CriticalLoad = 'tsCriticalLoad',
  DAPrice = 'tsDaPrice',
  DRCapacityPrice = 'mtsDrCapacityPrice',
  DRCapacityReservation = 'mtsDrCapacityReservation',
  DREnergyPrice = 'mtsDrEnergyPrice',
  DRMonthsApplied = 'mtsDrMonthsApplied',
  DeferralLoad = 'tsDeferralLoad',
  FleetEV = 'tsFleetEVBaselineLoadProfile',
  FRPrice = 'tsFrPrice',
  FRUpPrice = 'tsFrUpPrice',
  FRDownPrice = 'tsFrDownPrice',
  LFEnergyOptionUp = 'tsLfEOU',
  LFEnergyOptionDown = 'tsLfEOD',
  LFPrice = 'tsLfPrice',
  LFUpPrice = 'tsLfUpPrice',
  LFDownPrice = 'tsLfDownPrice',
  NSRPrice = 'tsNsrPrice',
  SiteLoad = 'tsSiteLoad',
  SolarGeneration = 'tsSolarPVGenerationProfile',
  SRPrice = 'tsSrPrice',
  SystemLoad = 'tsSystemLoad',
  RAActive = 'tsRaActive',
  RACapacityPrice = 'mtsRaCapacityPrice',
  UserEnergyMax = 'tsUserEnergyMax',
  UserEnergyMin = 'tsUserEnergyMin',
  UserPowerExportMax = 'tsUserPowerExportMax',
  UserPowerExportMin = 'tsUserPowerExportMin',
  UserPowerImportMax = 'tsUserPowerImportMax',
  UserPowerImportMin = 'tsUserPowerImportMin',
}

export const isTimeSeries = (field: string) => _.some(_.values(TimeSeriesTypes), f => f === field);

export default class TimeSeriesValidationFactory {
  static get(type: string) {
    const enumType = type as TimeSeriesTypes;
    if (enumType === TimeSeriesTypes.BackupEnergyPrice) {
      return BackupEnergyPrice;
    } if (enumType === TimeSeriesTypes.BackupEnergyReservation) {
      return BackupEnergyReservation;
    } if (enumType === TimeSeriesTypes.ControllableLoad) {
      return ControllableLoadTimeSeries;
    } if (enumType === TimeSeriesTypes.CriticalLoad) {
      return CriticalLoadTimeSeries;
    } if (enumType === TimeSeriesTypes.DAPrice) {
      return DAPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.DRCapacityPrice) {
      return DRCapacityPriceMonthly;
    } if (enumType === TimeSeriesTypes.DRCapacityReservation) {
      return DRCapacityReservationMonthly;
    } if (enumType === TimeSeriesTypes.DREnergyPrice) {
      return DREnergyPriceMonthly;
    } if (enumType === TimeSeriesTypes.DRMonthsApplied) {
      return DRMonthsAppliedMonthly;
    } if (enumType === TimeSeriesTypes.DeferralLoad) {
      return DeferralLoadTimeSeries;
    } if (enumType === TimeSeriesTypes.FleetEV) {
      return FleetEVBaselineLoadTimeSeries;
    } if (enumType === TimeSeriesTypes.FRPrice) {
      return FRPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.FRUpPrice) {
      return FRUpPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.FRDownPrice) {
      return FRDownPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.LFEnergyOptionUp) {
      return LFEnergyOptionUpTimeSeries;
    } if (enumType === TimeSeriesTypes.LFEnergyOptionDown) {
      return LFEnergyOptionDownTimeSeries;
    } if (enumType === TimeSeriesTypes.LFPrice) {
      return LFPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.LFUpPrice) {
      return LFUpPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.LFDownPrice) {
      return LFDownPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.NSRPrice) {
      return NSRPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.SiteLoad) {
      return SiteLoadTimeSeries;
    } if (enumType === TimeSeriesTypes.SolarGeneration) {
      return PVGenerationTimeSeries;
    } if (enumType === TimeSeriesTypes.SRPrice) {
      return SRPriceTimeSeries;
    } if (enumType === TimeSeriesTypes.SystemLoad) {
      return SystemLoadTimeSeries;
    } if (enumType === TimeSeriesTypes.RAActive) {
      return RAActiveTimeSeries;
    } if (enumType === TimeSeriesTypes.RACapacityPrice) {
      return RACapacityPriceMonthly;
    } if (enumType === TimeSeriesTypes.UserEnergyMax) {
      return UserEnergyMaxTimeSeries;
    } if (enumType === TimeSeriesTypes.UserEnergyMin) {
      return UserEnergyMinTimeSeries;
    } if (enumType === TimeSeriesTypes.UserPowerExportMax) {
      return UserPowerExportMaxTimeSeries;
    } if (enumType === TimeSeriesTypes.UserPowerExportMin) {
      return UserPowerExportMinTimeSeries;
    } if (enumType === TimeSeriesTypes.UserPowerImportMax) {
      return UserPowerImportMaxTimeSeries;
    } if (enumType === TimeSeriesTypes.UserPowerImportMin) {
      return UserPowerImportMinTimeSeries;
    }
    throw Error('Timeseries validation not found');
  }
}
