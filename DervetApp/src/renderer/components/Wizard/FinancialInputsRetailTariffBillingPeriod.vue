<template>
  <div>
    <h3>Retail Tariff: Add Billing Period</h3>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="start-month">Start Month</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="start-month"
              type="text"
              v-model.number="inputStartMonth">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="end-month">End Month</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="end-month"
              type="text"
              v-model.number="inputEndMonth">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="start-time">Start Hour</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="start-time"
              type="text"
              v-model.number="inputStartTime">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="end-time">End Hour</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="end-time"
              type="text"
              v-model.number="inputEndTime">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="weekday">Weekday</label>
          </div>
          <div class="col-md-9">
            <select
              class="form-control"
              id="weekday"
              v-model="inputWeekday">
              <option value="">-</option>
              <option v-for="value in validation.weekday.allowedValues" v-bind:value="value.value">
                {{value.description}}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="charge-type">Charge</label>
          </div>
          <div class="col-md-2" v-for="item in validation.chargeType.allowedValues">
            <input
              :id="`charge-type-${item.value}`"
              type="radio"
              v-model="inputChargeType"
              v-bind:value="item.value">
            <label :for="`charge-type-${item.value}`" class="font-weight-normal">{{item.value}}</label>
          </div>
        </div>

        <div class="form-group row" v-if="inputChargeType" id="value">
          <div class="col-md-3">
            <label class="control-label" for="value" id="Value-Label">{{getValueText(inputChargeType)}}</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="value"
              type="text"
              v-model.number="inputValue">
            <span class="unit-label" id="value-unit-label">{{getValueUnit(inputChargeType)}}</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="excluding-start-time">Excluding Start Hour</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="excluding-start-time"
              type="text"
              v-model.number="inputExcludingStartTime">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="excluding-end-time">Excluding End Hour</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="excluding-end-time"
              type="text"
              v-model.number="inputExcludingEndTime">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="name">Name (optional)</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="name"
              type="text"
              v-model="inputName">
          </div>
        </div>

        <hr>

        <nav-buttons
          back-link="/wizard/financial-inputs-retail-tariff"
          continue-link="/wizard/financial-inputs-retail-tariff"
          :save="this.save"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';

  import model from '@/models/RetailTariffBillingPeriod';
  import NavButtons from './NavButtons';

  const { defaults, validation } = model;

  export default {
    components: { NavButtons },
    data() {
      return {
        validation,
        ...this.getDefaultData(),
      };
    },
    methods: {
      getDefaultData() {
        return {
          inputRetailTariffBillingPeriodId: uuidv4(),
          inputStartMonth: defaults.startMonth,
          inputEndMonth: defaults.endMonth,
          inputStartTime: defaults.startTime,
          inputEndTime: defaults.endTime,
          inputExcludingStartTime: defaults.excludingStartTime,
          inputExcludingEndTime: defaults.excludingEndTime,
          inputWeekday: defaults.weekday,
          inputValue: defaults.value,
          inputChargeType: defaults.chargeType,
          inputName: defaults.name,
        };
      },
      getChargeTypeFromValue(chargeTypeValue) {
        return validation.chargeType.allowedValues.find(type => type.value === chargeTypeValue);
      },
      getValueText(chargeTypeValue) {
        return this.getChargeTypeFromValue(chargeTypeValue).valueText;
      },
      getValueUnit(chargeTypeValue) {
        return this.getChargeTypeFromValue(chargeTypeValue).unit;
      },
      save() {
        this.$store.dispatch('addRetailTariffBillingPeriod', this.buildBillingPeriod());
      },
      buildBillingPeriod() {
        return {
          retailTariffBillingPeriodId: this.inputRetailTariffBillingPeriodId,
          startMonth: this.inputStartMonth,
          endMonth: this.inputEndMonth,
          startTime: this.inputStartTime,
          endTime: this.inputEndTime,
          excludingStartTime: this.inputExcludingStartTime,
          excludingEndTime: this.inputExcludingEndTime,
          weekday: this.inputWeekday,
          value: this.inputValue,
          chargeType: this.inputChargeType,
          name: this.inputName,
        };
      },
    },
  };
</script>
