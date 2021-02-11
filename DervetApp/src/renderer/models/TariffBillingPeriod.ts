interface TariffBillingPeriod {
  id: number;
  startMonth: number;
  endMonth: number;
  startTime: number;
  endTime: number;
  excludingStartTime: number;
  excludingEndTime: number;
  weekday: string; // TODO enum eventually
  value: number;
  chargeType: string; // TODO enum eventually
  name?: string;
}

export default TariffBillingPeriod;
