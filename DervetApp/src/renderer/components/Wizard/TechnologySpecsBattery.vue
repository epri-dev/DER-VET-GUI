<template>
  <div>
    <h3>Technology Specs: Battery Storage</h3>
    <hr />
    <form>
      <div class="form-horizontal form-buffer container">

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="name">Name</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              id="name"
              type="text"
              v-model="inputName">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="energy-size">Energy Capacity Sizing</label>
          </div>
          <div class="col-md-9">
            <input
              id="energy-size-yes"
              type="radio"
              v-model="inputShouldEnergySize"
              v-bind:value="true">
            <label for="energy-size-yes" class="buffer-right">Have DER-VET size the Energy Capacity</label>
            <input
              id="energy-size-no"
              type="radio"
              v-model="inputShouldEnergySize"
              v-bind:value="false">
            <label for="energy-size-no">Known size</label>
          </div>
        </div>

        <div v-if="!inputShouldEnergySize" class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="energy-capacity">Energy Capacity</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox valid"
              id="energy-capacity"
              type="text"
              v-model.number="inputEnergyCapacity">
            <span class="unit-label">kWh</span>
            <p class="tool-tip tooltip-col">What is the energy capacity of the battery storage?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="power-size">Power Capacity Sizing</label>
          </div>
          <div class="col-md-9">
            <input
              id="power-size-yes"
              type="radio"
              v-model="inputShouldPowerSize"
              v-bind:value="true">
            <label for="power-size-yes" class="buffer-right">Have DER-VET size the Power Capacity</label>
            <input
              id="power-size-no"
              type="radio"
              v-model="inputShouldPowerSize"
              v-bind:value="false">
            <label for="power-size-no">Known size</label>
          </div>
        </div>

        <div v-if="!inputShouldPowerSize" class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="diff-charge-discharge">Different Charge and Discharge Power Capacities?</label>
          </div>
          <div class="col-md-9">
            <input
              id="diff-charge-discharge-yes"
              type="radio"
              v-model="inputShouldDiffChargeDischarge"
              v-bind:value="true">
            <label for="diff-charge-discharge-yes" class="buffer-right">Yes</label>
            <input
              id="diff-charge-discharge-no"
              type="radio"
              v-model="inputShouldDiffChargeDischarge"
              v-bind:value="false">
            <label for="diff-charge-discharge-no" class="buffer-right">No</label>
          </div>

          <div v-if="inputShouldDiffChargeDischarge" class="form-group row" style="; margin-left: 0px;">
            <div class="col-md-3">
              <label class="control-label" for="charging-capacity">Charging Capacity</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox valid"
                id="charging-capacity"
                type="text"
                v-model.number="inputChargingCapacity">
              <span class="unit-label">kW</span>
              <p class="tool-tip tooltip-col">What is the charging capacity (kW)?</p>
            </div>
            <!-- TODO: css: need some vertical space here -->
            <div class="col-md-3">
              <label class="control-label" for="discharging-capacity">Discharging Capacity</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox valid"
                id="discharging-capacity"
                type="text"
                v-model.number="inputDischargingCapacity">
              <span class="unit-label">kW</span>
              <p class="tool-tip tooltip-col">What is the discharging capacity (kW)?</p>
            </div>
          </div>

          <div v-if="!inputShouldDiffChargeDischarge" class="form-group row" style="; margin-left: 0px;">
            <div class="col-md-3">
              <label class="control-label" for="power-capacity">Power Capacity</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox valid"
                id="power-capacity"
                type="text"
                v-model.number="inputPowerCapacity">
              <span class="unit-label">kW</span>
              <p class="tool-tip tooltip-col">What is the power capacity of the battery storage?</p>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="max-duration-size">Set the max duration of the size?</label>
          </div>
          <div class="col-md-9">
            <input
              id="max-duration-size-yes"
              type="radio"
              v-model="inputShouldMaxDuration"
              v-bind:value="true">
            <label for="max-duration-size-yes" class="buffer-right">Yes</label>
            <input
              id="max-duration-size-no"
              type="radio"
              v-model="inputShouldMaxDuration"
              v-bind:value="false">
            <label for="max-duration-size-no" class="buffer-right">No</label>
          </div>
        </div>

        <div v-if="inputShouldMaxDuration" class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="max-duration">Maximum Duration</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox valid"
              id="max-duration"
              type="text"
              v-model.number="inputMaxDuration">
            <span class="unit-label">hours</span>
            <p class="tool-tip tooltip-col">Constrain the duration of the battery to this number of hours</p>
          </div>
        </div>
        <br />

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="roundtrip-efficiency">Roundtrip Efficiency</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="roundtrip-efficiency"
              type="text"
              v-model.number="inputRoundtripEfficiency">
            <span class="unit-label">%</span>
            <p class="tool-tip tooltip-col">What is the AC roundtrip efficiency of the storage system? Only this single number is considered - no variable efficiency is modeled.</p>
          </div>
        </div>

        <fieldset class="section-group">
          <legend>State of Charge</legend>
          <div class="form-group row">
            <div class="col-md-3">
              <label class="control-label" for="upper-soc-limit">Upper SOC Limit</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox"
                id="upper-soc-limit"
                type="text"
                v-model.number="inputUpperSOCLimit">
              <span class="unit-label">%</span>
              <p class="tool-tip tooltip-col">Energy Storage SOC upper bound</p>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-3">
              <label class="control-label" for="target-soc">Target SOC</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox"
                id="target-soc"
                type="text"
                v-model.number="inputTargetSOC">
              <span class="unit-label">%</span>
              <p class="tool-tip tooltip-col">What state of charge should the battery storage system return to at the end of each optimization window?</p>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-3">
              <label class="control-label" for="lower-soc-limit">Lower SOC Limit</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox"
                id="lower-soc-limit"
                type="text"
                v-model.number="inputLowerSOCLimit">
              <span class="unit-label">%</span>
              <p class="tool-tip tooltip-col">Energy Storage SOC lower bound</p>
            </div>
          </div>
        </fieldset>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="self-discharge-rate">Self-Discharge Rate</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="self-discharge-rate"
              type="text"
              v-model.number="inputSelfDischargeRate">
            <span class="unit-label">% / hour</span>
            <p class="tool-tip tooltip-col">What percent of the remaining stored energy will be wasted by the batteries every hour due to self-discharge?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="daily-cycling-limit">Limit Daily Cycling?</label>
          </div>
          <div class="col-md-9">
            <input
              id="daily-cycling-limit-yes"
              type="radio"
              v-model="inputShouldLimitDailyCycling"
              v-bind:value="true">
            <label for="daily-cycling-limit-yes" class="buffer-right">Yes</label>
            <input
              id="daily-cycling-limit-no"
              type="radio"
              v-model="inputShouldLimitDailyCycling"
              v-bind:value="false">
            <label for="daily-cycling-limit-no" class="buffer-right">No</label>
            <p class="tool-tip tooltip-col">Constrain the battery storage system's daily discharge energy. When selected, this input limits the amount of discharge energy a battery can do in any 24-hr period to a maximum of its rated energy capacity * daily cycle limit.</p>
          </div>
        </div>

        <div v-if="inputShouldLimitDailyCycling" class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="daily-cycle-limit">Daily Cycle Limit</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox valid"
              id="daily-cycle-limit"
              type="text"
              v-model.number="inputDailyCycleLimit">
            <span class="unit-label">hours</span>
            <p class="tool-tip tooltip-col">Limit the daily total discharge and ene throughput not to exceed the (number of cycles * max energy storage capacity)</p>
          </div>
        </div>
        <br />

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="calendar-degradation-rate">Calendar degradation rate</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox valid"
              id="calendar-degradation-rate"
              type="text"
              v-model.number="inputCalendarDegradationRate">
            <span class="unit-label">% / year</span>
            <p class="tool-tip tooltip-col">The calendar degradation combines with cycling degradation to get total degradation. * Note: Not compatible with size optimization.</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="include-cycle-degradation">Include degradation due to cycling?</label>
          </div>
          <div class="col-md-9">
            <input
              id="include-cycle-degradation-yes"
              type="radio"
              v-model="inputIncludeCycleDegradation"
              v-bind:value="true">
            <label for="include-cycle-degradation-yes" class="buffer-right">Yes</label>
            <input
              id="include-cycle-degradation-no"
              type="radio"
              v-model="inputIncludeCycleDegradation"
              v-bind:value="false">
            <label for="include-cycle-degradation-no" class="buffer-right">No</label>
            <p class="tool-tip tooltip-col">When selected, this will calculate degradation due to cycling based on the cycle life curve and combine this degradation with the calculated calendar degradation. * Note: Not compatible with deferral service.</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="include-auxiliary-load">Include Housekeeping Calculations?</label>
          </div>
          <div class="col-md-9">
            <input
              id="include-auxiliary-load-yes"
              type="radio"
              v-model="inputIncludeAuxiliaryLoad"
              v-bind:value="true">
            <label for="include-auxiliary-load-yes" class="buffer-right">Yes</label>
            <input
              id="include-auxiliary-load-no"
              type="radio"
              v-model="inputIncludeAuxiliaryLoad"
              v-bind:value="false">
            <label for="include-auxiliary-load-no" class="buffer-right">No</label>
            <p class="tool-tip tooltip-col">"Include Housekeeping Power" – Apply a constant AC power consumption that does not discharge the battery directly. This is usually associated with HVAC requirements and keeping all equipment on.</p>
          </div>
        </div>

        <div v-if="inputIncludeAuxiliaryLoad" class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="auxiliary-load">Auxiliary Load</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox valid"
              id="auxiliary-load"
              type="text"
              v-model.number="inputAuxiliaryLoad">
            <span class="unit-label">kW</span>
            <p class="tool-tip tooltip-col">On average, how much auxiliary power does the storage system draw to operate, including computers, fans, HVAC, etc., but not including power used to charge or discharge the batteries?</p>
          </div>
        </div>
        <br />

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="include-startup-cost">Include startup cost in the dispatch optimization?</label>
          </div>
          <div class="col-md-9">
            <input
              id="include-startup-cost-yes"
              type="radio"
              v-model="inputIncludeStartupCost"
              v-bind:value="true">
            <label for="include-startup-cost-yes" class="buffer-right">Yes</label>
            <input
              id="include-startup-cost-no"
              type="radio"
              v-model="inputIncludeStartupCost"
              v-bind:value="false">
            <label for="include-startup-cost-no" class="buffer-right">No</label>
          </div>
        </div>

        <fieldset class="section-group">
          <legend>Cost Function</legend>
          <div class="form-group row">
            <div class="col-md-3">
              <label class="control-label" for="capital-cost">Capital Cost</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox"
                id="capital-cost"
                type="text"
                v-model.number="inputCapitalCost">
              <span class="unit-label">$</span>
              <p class="tool-tip tooltip-col">What is the capital cost for the storage system?</p>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-3">
              <label class="control-label" for="capital-cost-per-kw">Capital Cost per kW</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox"
                id="capital-cost-per-kw"
                type="text"
                v-model.number="inputCapitalCostPerkW">
              <span class="unit-label">$ / kW</span>
              <p class="tool-tip tooltip-col">What is the capital cost per kW for the storage discharge power capacity?</p>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-3">
              <label class="control-label" for="capital-cost-per-kwh">Capital Cost per kWh</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox"
                id="capital-cost-per-kwh"
                type="text"
                v-model.number="inputCapitalCostPerkWh">
              <span class="unit-label">$ / kWh</span>
              <p class="tool-tip tooltip-col">What is the capital cost per kWh for the storage energy capacity?</p>
            </div>
          </div>
        </fieldset>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="fixed-om-cost">Fixed O&amp;M Costs</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="fixed-om-cost"
              type="text"
              v-model.number="inputFixedOMCosts">
            <span class="unit-label">$ / kW-year</span>
            <p class="tool-tip tooltip-col">What is the cost of fixed operations and maintenance for the battery storage system?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="variable-om-costs">Variable O&amp;M Costs</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="variable-om-costs"
              type="text"
              v-model.number="inputVariableOMCosts">
            <span class="unit-label">$ / MWh-year</span>
            <p class="tool-tip tooltip-col">What is the variable cost of operations and maintenance for the battery storage system?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="end-of-life-expenses">End of Life Expenses</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="end-of-life-expenses"
              type="text"
              v-model.number="inputEndOfLifeExpenses">
            <span class="unit-label">$</span>
            <p class="tool-tip tooltip-col">How much will it cost to decommission the battery at its end of life? This cost is applied at the end of life of the battery system in nominal dollars.</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="construction-date">Construction Date</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              id="construction-date"
              type="date"
              v-model="inputConstructionDate">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="operation-date">Operation Date</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              id="operation-date"
              type="date"
              v-model="inputOperationDate">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="macrs-term">MACRS Term</label>
          </div>
          <div class="col-md-9">
            <select
            class="form-control numberbox"
            id="macrs-term"
            v-model.number="inputMacrsTerm">
              <option v-bind:value="undefined">-</option>
              <option v-for="value in validation.macrsTerm.allowedValues" v-bind:value="value">
                {{value}}
              </option>
            </select>
            <span class="unit-label">years</span>
            <p class="tool-tip tooltip-col">Which MACRS GDS category does the battery storage system fall into?</p>
          </div>
        </div>
        <hr />

      <nav-buttons
        back-link="/wizard/technology-specs"
        :continue-link="inputIncludeCycleDegradation ? `/wizard/technology-specs-battery-cycle/${this.inputId}` : '/wizard/technology-specs'"
        :save="this.save"
      />

      </div>
    </form>

  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';

  import model from '@/models/TechnologySpecsBattery';
  import NavButtons from './NavButtons';

  const { defaults, validation } = model;

  export default {
    components: { NavButtons },
    props: ['batteryId'],
    data() {
      const data = { validation };
      if (this.batteryId === 'null') {
        return { ...data, ...this.getDefaultData() };
      }
      return { ...data, ...this.getDataFromProject() };
    },
    methods: {
      getDefaultData() {
        return {
          inputActive: defaults.active,
          inputTag: defaults.tag,
          inputTechnologyType: defaults.technologyType,
          inputId: uuidv4(),
          inputName: defaults.name,
          inputShouldEnergySize: defaults.shouldEnergySize,
          inputShouldPowerSize: defaults.shouldPowerSize,
          inputShouldMaxDuration: defaults.shouldMaxDuration,
          inputShouldDiffChargeDischarge: defaults.shouldDiffChargeDischarge,
          inputChargingCapacity: defaults.chargingCapacity,
          inputDischargingCapacity: defaults.dischargingCapacity,
          inputMaxDuration: defaults.maxDuration,
          inputRoundtripEfficiency: defaults.roundtripEfficiency,
          inputEnergyCapacity: defaults.energyCapacity,
          inputPowerCapacity: defaults.powerCapacity,
          inputUpperSOCLimit: defaults.upperSOCLimit,
          inputTargetSOC: defaults.targetSOC,
          inputLowerSOCLimit: defaults.lowerSOCLimit,
          inputSelfDischargeRate: defaults.selfDischargeRate,
          inputShouldLimitDailyCycling: defaults.shouldLimitDailyCycling,
          inputDailyCycleLimit: defaults.dailyCycleLimit,
          inputCalendarDegradationRate: defaults.calendarDegradationRate,
          inputIncludeCycleDegradation: defaults.includeCycleDegradation,
          inputBatteryCycles: defaults.batteryCycles,
          inputIncludeAuxiliaryLoad: defaults.includeAuxiliaryLoad,
          inputAuxiliaryLoad: defaults.auxiliaryLoad,
          inputIncludeStartupCost: defaults.includeStartupCost,
          inputCapitalCost: defaults.capitalCost,
          inputCapitalCostPerkW: defaults.capitalCostPerkW,
          inputCapitalCostPerkWh: defaults.capitalCostPerkWh,
          inputFixedOMCosts: defaults.fixedOMCosts,
          inputVariableOMCosts: defaults.variableOMCosts,
          inputEndOfLifeExpenses: defaults.endOfLifeExpenses,
          inputConstructionDate: defaults.constructionDate,
          inputOperationDate: defaults.operationDate,
          inputMacrsTerm: defaults.macrsTerm,
        };
      },
      getDataFromProject() {
        const batterySpecs = this.$store.getters.getBatteryById(this.batteryId);
        return {
          inputActive: batterySpecs.active,
          inputTag: batterySpecs.tag,
          inputTechnologyType: batterySpecs.technologyType,
          inputId: batterySpecs.id,
          inputName: batterySpecs.name,
          inputShouldEnergySize: batterySpecs.shouldEnergySize,
          inputShouldPowerSize: batterySpecs.shouldPowerSize,
          inputShouldMaxDuration: batterySpecs.shouldMaxDuration,
          inputShouldDiffChargeDischarge: batterySpecs.shouldDiffChargeDischarge,
          inputChargingCapacity: batterySpecs.chargingCapacity,
          inputDischargingCapacity: batterySpecs.dischargingCapacity,
          inputMaxDuration: batterySpecs.maxDuration,
          inputRoundtripEfficiency: batterySpecs.roundtripEfficiency,
          inputEnergyCapacity: batterySpecs.energyCapacity,
          inputPowerCapacity: batterySpecs.powerCapacity,
          inputUpperSOCLimit: batterySpecs.upperSOCLimit,
          inputTargetSOC: batterySpecs.targetSOC,
          inputLowerSOCLimit: batterySpecs.lowerSOCLimit,
          inputSelfDischargeRate: batterySpecs.selfDischargeRate,
          inputShouldLimitDailyCycling: batterySpecs.shouldLimitDailyCycling,
          inputDailyCycleLimit: batterySpecs.dailyCycleLimit,
          inputCalendarDegradationRate: batterySpecs.calendarDegradationRate,
          inputIncludeCycleDegradation: batterySpecs.includeCycleDegradation,
          inputBatteryCycles: batterySpecs.batteryCycles,
          inputIncludeAuxiliaryLoad: batterySpecs.includeAuxiliaryLoad,
          inputAuxiliaryLoad: batterySpecs.auxiliaryLoad,
          inputIncludeStartupCost: batterySpecs.includeStartupCost,
          inputCapitalCost: batterySpecs.capitalCost,
          inputCapitalCostPerkW: batterySpecs.capitalCostPerkW,
          inputCapitalCostPerkWh: batterySpecs.capitalCostPerkWh,
          inputFixedOMCosts: batterySpecs.fixedOMCosts,
          inputVariableOMCosts: batterySpecs.variableOMCosts,
          inputEndOfLifeExpenses: batterySpecs.endOfLifeExpenses,
          inputConstructionDate: batterySpecs.constructionDate,
          inputOperationDate: batterySpecs.operationDate,
          inputMacrsTerm: batterySpecs.macrsTerm,
        };
      },
      save() {
        if (this.batteryId === 'null') {
          this.$store.dispatch('addTechnologySpecsBattery', this.buildBattery());
        } else {
          const payload = {
            newBattery: this.buildBattery(),
            batteryId: this.batteryId,
          };
          this.$store.dispatch('replaceTechnologySpecsBattery', payload);
        }
        this.$store.dispatch('resetListOfActiveTechnologies');
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      buildBattery() {
        return {
          active: !this.inputIncludeCycleDegradation,
          tag: this.inputTag,
          technologyType: this.inputTechnologyType,
          id: this.inputId,
          name: this.inputName,
          shouldEnergySize: this.inputShouldEnergySize,
          shouldPowerSize: this.inputShouldPowerSize,
          shouldMaxDuration: this.inputShouldMaxDuration,
          shouldDiffChargeDischarge: this.inputShouldDiffChargeDischarge,
          chargingCapacity: this.inputChargingCapacity,
          dischargingCapacity: this.inputDischargingCapacity,
          maxDuration: this.inputMaxDuration,
          roundtripEfficiency: this.inputRoundtripEfficiency,
          energyCapacity: this.inputEnergyCapacity,
          powerCapacity: this.inputPowerCapacity,
          upperSOCLimit: this.inputUpperSOCLimit,
          targetSOC: this.inputTargetSOC,
          lowerSOCLimit: this.inputLowerSOCLimit,
          selfDischargeRate: this.inputSelfDischargeRate,
          shouldLimitDailyCycling: this.inputShouldLimitDailyCycling,
          dailyCycleLimit: this.inputDailyCycleLimit,
          calendarDegradationRate: this.inputCalendarDegradationRate,
          includeCycleDegradation: this.inputIncludeCycleDegradation,
          batteryCycles: this.inputBatteryCycles,
          includeAuxiliaryLoad: this.inputIncludeAuxiliaryLoad,
          auxiliaryLoad: this.inputAuxiliaryLoad,
          includeStartupCost: this.inputIncludeStartupCost,
          capitalCost: this.inputCapitalCost,
          capitalCostPerkW: this.inputCapitalCostPerkW,
          capitalCostPerkWh: this.inputCapitalCostPerkWh,
          fixedOMCosts: this.inputFixedOMCosts,
          variableOMCosts: this.inputVariableOMCosts,
          endOfLifeExpenses: this.inputEndOfLifeExpenses,
          constructionDate: this.inputConstructionDate,
          operationDate: this.inputOperationDate,
          macrsTerm: this.inputMacrsTerm,
        };
      },
    },
  };
</script>
