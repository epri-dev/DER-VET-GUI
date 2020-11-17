<template>
  <div>
    <h3>Technology Specs: Battery Storage</h3>
    <form>
      <div class="form-horizontal form-buffer container">

        <!-- TODO
          - DRY more by just passing the field and generating parameters
          - use nameData.getErrorMsg
        -->
        <text-input
          v-model="name"
          v-bind:field="metadata.name"
          :isInvalid="submitted && $v.name.$error"
          :errorMessage="getErrorMsg('name')">
        </text-input>

        <radio-button-input
          v-model="shouldEnergySize"
          v-bind:field="metadata.shouldEnergySize"
          :isInvalid="submitted && $v.shouldEnergySize.$error"
          :errorMessage="getErrorMsg('shouldEnergySize')">
        </radio-button-input>

        <div v-if="shouldEnergySize === false">
          <text-input
            v-model="energyCapacity"
            v-bind:field="metadata.energyCapacity"
            :isInvalid="submitted && $v.energyCapacity.$error"
            :errorMessage="getErrorMsg('energyCapacity')">
          </text-input>
        </div>

        <radio-button-input
          v-model="shouldPowerSize"
          v-bind:field="metadata.shouldPowerSize"
          :isInvalid="submitted && $v.shouldPowerSize.$error"
          :errorMessage="getErrorMsg('shouldPowerSize')">
        </radio-button-input>

        <div v-if="shouldPowerSize === false">
          <radio-button-input
            v-model="shouldDiffChargeDischarge"
            v-bind:field="metadata.shouldDiffChargeDischarge"
            :isInvalid="submitted && $v.shouldDiffChargeDischarge.$error"
            :errorMessage="getErrorMsg('shouldDiffChargeDischarge')">
          </radio-button-input>

          <div v-if="shouldDiffChargeDischarge === true">
            <text-input
              v-model="chargingCapacity"
              v-bind:field="metadata.chargingCapacity"
              :isInvalid="submitted && $v.chargingCapacity.$error"
              :errorMessage="getErrorMsg('chargingCapacity')">
            </text-input>
            <text-input
              v-model="dischargingCapacity"
              v-bind:field="metadata.dischargingCapacity"
              :isInvalid="submitted && $v.dischargingCapacity.$error"
              :errorMessage="getErrorMsg('dischargingCapacity')">
            </text-input>
          </div>

          <div v-if="shouldDiffChargeDischarge === false">
            <text-input
              v-model="powerCapacity"
              v-bind:field="metadata.powerCapacity"
              :isInvalid="submitted && $v.powerCapacity.$error"
              :errorMessage="getErrorMsg('powerCapacity')">
            </text-input>
          </div>
        </div>

        <radio-button-input
          v-model="shouldMaxDuration"
          v-bind:field="metadata.shouldMaxDuration"
          :isInvalid="submitted && $v.shouldMaxDuration.$error"
          :errorMessage="getErrorMsg('shouldMaxDuration')">
        </radio-button-input>

        <div v-if="shouldMaxDuration === true">
          <text-input
            v-model="maxDuration"
            v-bind:field="metadata.maxDuration"
            :isInvalid="submitted && $v.maxDuration.$error"
            :errorMessage="getErrorMsg('maxDuration')">
          </text-input>
        </div>

        <text-input
          v-model="roundtripEfficiency"
          v-bind:field="metadata.roundtripEfficiency"
          :isInvalid="submitted && $v.roundtripEfficiency.$error"
          :errorMessage="getErrorMsg('roundtripEfficiency')">
        </text-input>

        <fieldset class="section-group">
          <legend>State of Charge</legend>

          <text-input
            v-model="upperSOCLimit"
            v-bind:field="metadata.upperSOCLimit"
            :isInvalid="submitted && $v.upperSOCLimit.$error"
            :errorMessage="getErrorMsg('upperSOCLimit')">
          </text-input>
          <text-input
            v-model="targetSOC"
            v-bind:field="metadata.targetSOC"
            :isInvalid="submitted && $v.targetSOC.$error"
            :errorMessage="getErrorMsg('targetSOC')">
          </text-input>
          <text-input
            v-model="lowerSOCLimit"
            v-bind:field="metadata.lowerSOCLimit"
            :isInvalid="submitted && $v.lowerSOCLimit.$error"
            :errorMessage="getErrorMsg('lowerSOCLimit')">
          </text-input>
          <text-input
            v-model="selfDischargeRate"
            v-bind:field="metadata.selfDischargeRate"
            :isInvalid="submitted && $v.selfDischargeRate.$error"
            :errorMessage="getErrorMsg('selfDischargeRate')">
          </text-input>

        </fieldset>

        <radio-button-input
          v-model="shouldLimitDailyCycling"
          v-bind:field="metadata.shouldLimitDailyCycling"
          :isInvalid="submitted && $v.shouldLimitDailyCycling.$error"
          :errorMessage="getErrorMsg('shouldLimitDailyCycling')">
        </radio-button-input>

        <div v-if="shouldLimitDailyCycling === true">
          <text-input
            v-model="dailyCycleLimit"
            v-bind:field="metadata.dailyCycleLimit"
            :isInvalid="submitted && $v.dailyCycleLimit.$error"
            :errorMessage="getErrorMsg('dailyCycleLimit')">
          </text-input>
        </div>

        <text-input
          v-model="calendarDegradationRate"
          v-bind:field="metadata.calendarDegradationRate"
          :isInvalid="submitted && $v.calendarDegradationRate.$error"
          :errorMessage="getErrorMsg('calendarDegradationRate')">
        </text-input>

        <radio-button-input
          v-model="includeCycleDegradation"
          v-bind:field="metadata.includeCycleDegradation"
          :isInvalid="submitted && $v.includeCycleDegradation.$error"
          :errorMessage="getErrorMsg('includeCycleDegradation')">
        </radio-button-input>

        <radio-button-input
          v-model="includeAuxiliaryLoad"
          v-bind:field="metadata.includeAuxiliaryLoad"
          :isInvalid="submitted && $v.includeAuxiliaryLoad.$error"
          :errorMessage="getErrorMsg('includeAuxiliaryLoad')">
        </radio-button-input>

        <div v-if="includeAuxiliaryLoad === true">
          <text-input
            v-model="auxiliaryLoad"
            v-bind:field="metadata.auxiliaryLoad"
            :isInvalid="submitted && $v.auxiliaryLoad.$error"
            :errorMessage="getErrorMsg('auxiliaryLoad')">
          </text-input>
        </div>

        <radio-button-input
          v-model="includeStartupCost"
          v-bind:field="metadata.includeStartupCost"
          :isInvalid="submitted && $v.includeStartupCost.$error"
          :errorMessage="getErrorMsg('includeStartupCost')">
        </radio-button-input>

        <fieldset class="section-group">
          <legend>Cost Function</legend>

          <text-input
            v-model="capitalCost"
            v-bind:field="metadata.capitalCost"
            :isInvalid="submitted && $v.capitalCost.$error"
            :errorMessage="getErrorMsg('capitalCost')">
          </text-input>

          <text-input
            v-model="capitalCostPerkW"
            v-bind:field="metadata.capitalCostPerkW"
            :isInvalid="submitted && $v.capitalCostPerkW.$error"
            :errorMessage="getErrorMsg('capitalCostPerkW')">
          </text-input>

          <text-input
            v-model="capitalCostPerkWh"
            v-bind:field="metadata.capitalCostPerkWh"
            :isInvalid="submitted && $v.capitalCostPerkWh.$error"
            :errorMessage="getErrorMsg('capitalCostPerkWh')">
          </text-input>

        </fieldset>

        <text-input
          v-model="fixedOMCosts"
          v-bind:field="metadata.fixedOMCosts"
          :isInvalid="submitted && $v.fixedOMCosts.$error"
          :errorMessage="getErrorMsg('fixedOMCosts')">
        </text-input>

        <text-input
          v-model="variableOMCosts"
          v-bind:field="metadata.variableOMCosts"
          :isInvalid="submitted && $v.variableOMCosts.$error"
          :errorMessage="getErrorMsg('variableOMCosts')">
        </text-input>

        <text-input
          v-model="endOfLifeExpenses"
          v-bind:field="metadata.endOfLifeExpenses"
          :isInvalid="submitted && $v.endOfLifeExpenses.$error"
          :errorMessage="getErrorMsg('endOfLifeExpenses')">
        </text-input>

        <text-input
          v-model="constructionDate"
          v-bind:field="metadata.constructionDate"
          :isInvalid="submitted && $v.constructionDate.$error"
          :errorMessage="getErrorMsg('constructionDate')">
        </text-input>

        <text-input
          v-model="operationDate"
          v-bind:field="metadata.operationDate"
          :isInvalid="submitted && $v.operationDate.$error"
          :errorMessage="getErrorMsg('operationDate')">
        </text-input>

        <drop-down-input
          v-model="macrsTerm"
          v-bind:field="metadata.macrsTerm"
          :isInvalid="submitted && $v.macrsTerm.$error"
          :errorMessage="getErrorMsg('macrsTerm')">
        </drop-down-input>

        <nav-buttons
          back-link="/wizard/technology-specs"
          continue-link="/wizard/technology-specs"
          :save="validatedSave"
          :disabled=$v.$invalid
          :displayError="submitted && $v.$anyError"
        />

      </div>
    </form>

  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import TechnologySpecsBatteryMetadata from '@/models/Project/TechnologySpecsBattery';

  const metadata = TechnologySpecsBatteryMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    name: 'TechnologySpecsBattery',
    // TODO maybe rename this to just 'id'
    mixins: [wizardFormMixin],
    props: ['batteryId'],
    data() {
      const values = this.isnewBattery() ?
        metadata.getDefaultValues() : this.getBatteryFromStore();
      return {
        metadata,
        ...values,
      };
    },
    validations: {
      ...validations,
      energyCapacity: {
        ...validations.energyCapacity,
        required: requiredIf(function isEnergyCapacityRequired() {
          return this.shouldEnergySize === false;
        }),
      },
      shouldDiffChargeDischarge: {
        ...validations.shouldDiffChargeDischarge,
        required: requiredIf(function isShouldDiffChargeDischargeRequired() {
          return this.shouldPowerSize === false;
        }),
      },
      chargingCapacity: {
        ...validations.chargingCapacity,
        required: requiredIf(function isChargingCapacityRequired() {
          return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === true);
        }),
      },
      dischargingCapacity: {
        ...validations.dischargingCapacity,
        required: requiredIf(function isDischargingCapacityRequired() {
          return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === true);
        }),
      },
      powerCapacity: {
        ...validations.powerCapacity,
        required: requiredIf(function isPowerCapacityRequired() {
          return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === false);
        }),
      },
      maxDuration: {
        ...validations.maxDuration,
        required: requiredIf(function isMaxDurationRequired() {
          return (this.shouldMaxDuration === true);
        }),
      },
      dailyCycleLimit: {
        ...validations.dailyCycleLimit,
        required: requiredIf(function isDailyCycleLimitRequired() {
          return (this.shouldLimitDailyCycling === true);
        }),
      },
      auxiliaryLoad: {
        ...validations.auxiliaryLoad,
        required: requiredIf(function isAuxiliaryLoadRequired() {
          return (this.includeAuxiliaryLoad === true);
        }),
      },
    },
    methods: {
      isnewBattery() {
        return this.batteryId === 'null';
      },
      getBatteryFromStore() {
        return this.$store.getters.getBatteryById(this.batteryId);
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      validatedSave() {
        this.submitted = true;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          return this.saveAndContinue();
        }
        return () => {};
      },
      saveAndContinue() {
        const batterySpec = this.buildBattery();
        if (this.isnewBattery()) {
          this.$store.dispatch('addTechnologySpecsBattery', batterySpec);
        } else {
          const payload = {
            newBattery: batterySpec,
            batteryId: this.batteryId,
          };
          this.$store.dispatch('replaceTechnologySpecsBattery', payload);
        }
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      buildBattery() {
        return {
          active: this.active,
          auxiliaryLoad: this.auxiliaryLoad,
          calendarDegradationRate: this.calendarDegradationRate,
          capitalCost: this.capitalCost,
          capitalCostPerkW: this.capitalCostPerkW,
          capitalCostPerkWh: this.capitalCostPerkWh,
          chargingCapacity: this.chargingCapacity,
          constructionDate: this.constructionDate,
          dailyCycleLimit: this.dailyCycleLimit,
          dischargingCapacity: this.dischargingCapacity,
          endOfLifeExpenses: this.endOfLifeExpenses,
          energyCapacity: this.energyCapacity,
          fixedOMCosts: this.fixedOMCosts,
          id: this.id,
          includeAuxiliaryLoad: this.includeAuxiliaryLoad,
          includeCycleDegradation: this.includeCycleDegradation,
          includeStartupCost: this.includeStartupCost,
          lowerSOCLimit: this.lowerSOCLimit,
          macrsTerm: this.macrsTerm,
          maxDuration: this.maxDuration,
          name: this.name,
          operationDate: this.operationDate,
          powerCapacity: this.powerCapacity,
          roundtripEfficiency: this.roundtripEfficiency,
          selfDischargeRate: this.selfDischargeRate,
          shouldDiffChargeDischarge: this.shouldDiffChargeDischarge,
          shouldEnergySize: this.shouldEnergySize,
          shouldLimitDailyCycling: this.shouldLimitDailyCycling,
          shouldMaxDuration: this.shouldMaxDuration,
          shouldPowerSize: this.shouldPowerSize,
          tag: this.tag,
          targetSOC: this.targetSOC,
          technologyType: this.technologyType,
          upperSOCLimit: this.upperSOCLimit,
          variableOMCosts: this.variableOMCosts,
        };
      },
    },
  };
</script>
