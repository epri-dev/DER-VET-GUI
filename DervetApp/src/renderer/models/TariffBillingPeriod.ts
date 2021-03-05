import { AllowedValue } from '@/util/project';

// TODO consolidate with RetailTariffBillingPeriod.js
export enum ChargeType {
  Energy = 'Energy',
  Demand = 'Demand',
}

export enum WeekDay {
  Weekends = 'Weekends',
  Weekdays = 'Weekdays',
  Both = 'Both',
}

export const CHARGE_TYPE_ALLOWED_VALUES: Map<ChargeType, AllowedValue> = new Map([
  [ChargeType.Energy, { value: ChargeType.Energy, label: 'Energy Price', unit: '$/kWh' }],
  [ChargeType.Demand, { value: ChargeType.Demand, label: 'Demand Rate', unit: '$/kW' }],
]);

export const WEEKDAY_ALLOWED_VALUES: Map<WeekDay, AllowedValue> = new Map([
  [WeekDay.Weekends, { value: 0, label: 'Weekends' }],
  [WeekDay.Weekdays, { value: 1, label: 'Weekdays' }],
  [WeekDay.Both, { value: 2, label: 'Both weekends and weekdays' }],
]);

export interface TariffBillingPeriod {
  id: number;
  startMonth: number;
  endMonth: number;
  startTime: number;
  endTime: number;
  excludingStartTime?: number;
  excludingEndTime?: number;
  weekday: WeekDay;
  value: number;
  chargeType: ChargeType;
  name?: string;
  complete: boolean;
}
