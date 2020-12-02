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
          :back-link="FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
          :continue-link="FINANCIAL_INPUTS_RETAIL_TARIFF_PATH"
          :save="this.save"
        />
      </div>
    </form>
  </div>
</template>

<script>
  import { RetailTariffBillingPeriod, validation } from '@/models/RetailTariffBillingPeriod';
  import NavButtons from '@/components/Shared/NavButtons';
  import { FINANCIAL_INPUTS_RETAIL_TARIFF_PATH } from '@/router/constants';
  import { v4 as uuidv4 } from 'uuid';

  export default {
    components: { NavButtons },
    props: ['billingPeriodId'],
    data() {
      if (this.billingPeriodId === 'null') {
        return {
          FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
          validation,
          ...this.getDefaultData(),
        };
      }
      return {
        FINANCIAL_INPUTS_RETAIL_TARIFF_PATH,
        validation,
        ...this.getDataFromProject(),
      };
    },
    methods: {
      getDefaultData() {
        const defaults = RetailTariffBillingPeriod.getDefaults();
        return this.unpackData(defaults);
      },
      getDataFromProject() {
        const pd = this.$store.getters.getListFieldById('retailTariffBillingPeriods', this.billingPeriodId);
        return this.unpackData(pd);
      },
      unpackData(source) {
        return {
          inputId: source.id,
          inputStartMonth: source.startMonth,
          inputEndMonth: source.endMonth,
          inputStartTime: source.startTime,
          inputEndTime: source.endTime,
          inputExcludingStartTime: source.excludingStartTime,
          inputExcludingEndTime: source.excludingEndTime,
          inputWeekday: source.weekday,
          inputValue: source.value,
          inputChargeType: source.chargeType,
          inputName: source.name,
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
        if (this.billingPeriodId === 'null') {
          this.changeId();
          this.$store.dispatch('addRetailTariffBillingPeriod', this.buildBillingPeriod());
        } else {
          const payload = {
            id: this.billingPeriodId,
            field: 'retailTariffBillingPeriods',
            newListItem: this.buildBillingPeriod(),
          };
          this.$store.dispatch('replaceListField', payload);
        }
      },
      buildBillingPeriod() {
        let id = this.billingPeriodId;
        if (id === 'null') {
          id = uuidv4();
        }
        return new RetailTariffBillingPeriod({
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
          id,
        });
      },
    },
  };
</script>
