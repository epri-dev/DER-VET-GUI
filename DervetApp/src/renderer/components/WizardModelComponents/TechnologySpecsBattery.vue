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

        <div v-if="(shouldPowerSize === true) || (shouldEnergySize === true)">
          <radio-button-input
            v-model="includeSizeLimits"
            v-bind:field="metadata.includeSizeLimits"
            :isInvalid="submitted && $v.includeSizeLimits.$error"
            :errorMessage="getErrorMsg('includeSizeLimits')">
          </radio-button-input>

          <div v-if="(includeSizeLimits === true) && (shouldPowerSize === true)">
            <text-input
              v-model="powerCapacityMaximum"
              v-bind:field="metadata.powerCapacityMaximum"
              :isInvalid="submitted && $v.powerCapacityMaximum.$error"
              :errorMessage="getErrorMsg('powerCapacityMaximum')">
            </text-input>

            <text-input
              v-model="powerCapacityMinimum"
              v-bind:field="metadata.powerCapacityMinimum"
              :isInvalid="submitted && $v.powerCapacityMinimum.$error"
              :errorMessage="getErrorMsg('powerCapacityMinimum')">
            </text-input>
          </div>

          <div v-if="(includeSizeLimits === true) && (shouldEnergySize === true)">
            <text-input
              v-model="energyCapacityMaximum"
              v-bind:field="metadata.energyCapacityMaximum"
              :isInvalid="submitted && $v.energyCapacityMaximum.$error"
              :errorMessage="getErrorMsg('energyCapacityMaximum')">
            </text-input>

            <text-input
              v-model="energyCapacityMinimum"
              v-bind:field="metadata.energyCapacityMinimum"
              :isInvalid="submitted && $v.energyCapacityMinimum.$error"
              :errorMessage="getErrorMsg('energyCapacityMinimum')">
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

        <radio-button-input
          v-model="includeCycleDegradation"
          v-bind:field="metadata.includeCycleDegradation"
          :isInvalid="submitted && $v.includeCycleDegradation.$error"
          :errorMessage="getErrorMsg('includeCycleDegradation')">
        </radio-button-input>

        <div v-if="includeCycleDegradation === true">
          <text-input
            v-model="calendarDegradationRate"
            v-bind:field="metadata.calendarDegradationRate"
            :isInvalid="submitted && $v.calendarDegradationRate.$error"
            :errorMessage="getErrorMsg('calendarDegradationRate')">
          </text-input>

          <text-input
            v-model="stateOfHealth"
            v-bind:field="metadata.stateOfHealth"
            :isInvalid="submitted && $v.stateOfHealth.$error"
            :errorMessage="getErrorMsg('stateOfHealth')">
          </text-input>
        </div>

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
          v-model="constructionYear"
          v-bind:field="metadata.constructionYear"
          :isInvalid="submitted && $v.constructionYear.$error"
          :errorMessage="getErrorMsg('constructionYear')">
        </text-input>

        <text-input
          v-model="operationYear"
          v-bind:field="metadata.operationYear"
          :isInvalid="submitted && $v.operationYear.$error"
          :errorMessage="getErrorMsg('operationYear')">
        </text-input>

        <text-input
          v-model="expectedLifetime"
          v-bind:field="metadata.expectedLifetime"
          :isInvalid="submitted && $v.expectedLifetime.$error"
          :errorMessage="getErrorMsg('expectedLifetime')">
        </text-input>

        <radio-button-input
          v-model="isReplaceable"
          v-bind:field="metadata.isReplaceable"
          :isInvalid="submitted && $v.isReplaceable.$error"
          :errorMessage="getErrorMsg('isReplaceable')">
        </radio-button-input>

        <div v-if="isReplaceable === true">
          <text-input
            v-model="replacementConstructionTime"
            v-bind:field="metadata.replacementConstructionTime"
            :isInvalid="submitted && $v.replacementConstructionTime.$error"
            :errorMessage="getErrorMsg('replacementConstructionTime')">
          </text-input>

          <fieldset class="section-group">
            <legend>Replacement Cost Function</legend>
            <text-input
              v-model="replacementCost"
              v-bind:field="metadata.replacementCost"
              :isInvalid="submitted && $v.replacementCost.$error"
              :errorMessage="getErrorMsg('replacementCost')">
            </text-input>

            <text-input
              v-model="replacementCostPerkW"
              v-bind:field="metadata.replacementCostPerkW"
              :isInvalid="submitted && $v.replacementCostPerkW.$error"
              :errorMessage="getErrorMsg('replacementCostPerkW')">
            </text-input>
            <text-input
              v-model="replacementCostPerkWh"
              v-bind:field="metadata.replacementCostPerkWh"
              :isInvalid="submitted && $v.replacementCostPerkWh.$error"
              :errorMessage="getErrorMsg('replacementCostPerkWh')">
            </text-input>
          </fieldset>
        </div>

        <text-input
          v-model="decomissioningCost"
          v-bind:field="metadata.decomissioningCost"
          :isInvalid="submitted && $v.decomissioningCost.$error"
          :errorMessage="getErrorMsg('decomissioningCost')">
        </text-input>

        <drop-down-input
          v-model="salvageValueOption"
          v-bind:field="metadata.salvageValueOption"
          :isInvalid="submitted && $v.salvageValueOption.$error"
          :errorMessage="getErrorMsg('salvageValueOption')">
        </drop-down-input>

        <div v-if="salvageValueOption === 'User defined'">
          <text-input
            v-model="salvageValue"
            v-bind:field="metadata.salvageValue"
            :isInvalid="submitted && $v.salvageValue.$error"
            :errorMessage="getErrorMsg('salvageValue')">
          </text-input>
        </div>

        <text-input
          v-model="ter"
          v-bind:field="metadata.ter"
          :isInvalid="submitted && $v.ter.$error"
          :errorMessage="getErrorMsg('ter')">
        </text-input>

        <drop-down-input
          v-model="macrsTerm"
          v-bind:field="metadata.macrsTerm"
          :isInvalid="submitted && $v.macrsTerm.$error"
          :errorMessage="getErrorMsg('macrsTerm')">
        </drop-down-input>

        <save-buttons
          :continue-link=this.getContinueLink()
          :displayError="submitted && $v.$anyError"
          :save="validatedSave"
        />

      </div>
    </form>

  </div>
</template>

<script>
  import { requiredIf } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import TechnologySpecsBatteryMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsBattery';
  import { WIZARD_COMPONENT_PATH }
    from '@/router/constants';

  const metadata = TechnologySpecsBatteryMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    name: 'TechnologySpecsBattery',
    // TODO maybe rename this to just 'id'
    mixins: [wizardFormMixin],
    props: ['batteryId'],
    data() {
      const values = this.isnewBattery() ? metadata.getDefaultValues() : this.getBatteryFromStore();
      return {
        metadata,
        ...values,
        WIZARD_COMPONENT_PATH,
      };
    },
    validations: {
      ...validations,
      auxiliaryLoad: {
        ...validations.auxiliaryLoad,
        required: requiredIf(function isAuxiliaryLoadRequired() {
          return (this.includeAuxiliaryLoad === true);
        }),
      },
      calendarDegradationRate: {
        ...validations.calendarDegradationRate,
        required: requiredIf(function isCalendarDegradationRateRequired() {
          return (this.includeCycleDegradation === true);
        }),
      },
      chargingCapacity: {
        ...validations.chargingCapacity,
        required: requiredIf(function isChargingCapacityRequired() {
          return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === true);
        }),
      },
      dailyCycleLimit: {
        ...validations.dailyCycleLimit,
        required: requiredIf(function isDailyCycleLimitRequired() {
          return (this.shouldLimitDailyCycling === true);
        }),
      },
      dischargingCapacity: {
        ...validations.dischargingCapacity,
        required: requiredIf(function isDischargingCapacityRequired() {
          return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === true);
        }),
      },
      energyCapacity: {
        ...validations.energyCapacity,
        required: requiredIf(function isEnergyCapacityRequired() {
          return this.shouldEnergySize === false;
        }),
      },
      energyCapacityMaximum: {
        ...validations.energyCapacityMaximum,
        required: requiredIf(function isEnergyCapacityMaximumRequired() {
          return (this.includeSizeLimits === true) && (this.shouldEnergySize === true);
        }),
      },
      energyCapacityMinimum: {
        ...validations.energyCapacityMinimum,
        required: requiredIf(function isEnergyCapacityMinimumRequired() {
          return (this.includeSizeLimits === true) && (this.shouldEnergySize === true);
        }),
      },
      includeSizeLimits: {
        ...validations.includeSizeLimits,
        required: requiredIf(function isIncludeSizeLimitsRequired() {
          return this.shouldEnergySize || this.shouldPowerSize;
        }),
      },
      maxDuration: {
        ...validations.maxDuration,
        required: requiredIf(function isMaxDurationRequired() {
          return (this.shouldMaxDuration === true);
        }),
      },
      powerCapacity: {
        ...validations.powerCapacity,
        required: requiredIf(function isPowerCapacityRequired() {
          return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === false);
        }),
      },
      powerCapacityMaximum: {
        ...validations.powerCapacityMaximum,
        required: requiredIf(function isPowerCapacityMaximumRequired() {
          return (this.includeSizeLimits === true) && (this.shouldPowerSize === true);
        }),
      },
      powerCapacityMinimum: {
        ...validations.powerCapacityMinimum,
        required: requiredIf(function isPowerCapacityMinimumRequired() {
          return (this.includeSizeLimits === true) && (this.shouldPowerSize === true);
        }),
      },
      replacementCost: {
        ...validations.replacementCost,
        required: requiredIf(function isReplacementCostRequired() {
          return (this.isReplaceable === true);
        }),
      },
      replacementCostPerkW: {
        ...validations.replacementCostPerkW,
        required: requiredIf(function isReplacementCostPerkWRequired() {
          return (this.isReplaceable === true);
        }),
      },
      replacementCostPerkWh: {
        ...validations.replacementCostPerkWh,
        required: requiredIf(function isReplacementCostPerkWhRequired() {
          return (this.isReplaceable === true);
        }),
      },
      replacementConstructionTime: {
        ...validations.replacementConstructionTime,
        required: requiredIf(function isReplacementConstructionTimeRequired() {
          return (this.isReplaceable === true);
        }),
      },
      stateOfHealth: {
        ...validations.stateOfHealth,
        required: requiredIf(function isStateOfHealthRequired() {
          return (this.includeCycleDegradation === true);
        }),
      },
      salvageValue: {
        ...validations.salvageValue,
        required: requiredIf(function isSalvageValueRequired() {
          return (this.salvageValueOption === 'User defined');
        }),
      },
      shouldDiffChargeDischarge: {
        ...validations.shouldDiffChargeDischarge,
        required: requiredIf(function isShouldDiffChargeDischargeRequired() {
          return this.shouldPowerSize === false;
        }),
      },
    },
    beforeMount() {
      // in quick start mode, do a save initially to reset non-required inputs
      if (this.complete === true && this.submitted === false) {
        this.validatedSave();
      }
      // submitted is false initially; set it to true after the first save.
      // initially, complete is null; after saving, it is set to either true or false.
      // we want to show validation errors at any time after the first save, with submitted.
      if (this.complete !== null) {
        this.submitted = true;
        this.$v.$touch();
      }
    },
    methods: {
      resetNonRequired(list) {
        list.forEach((item) => {
          this[item] = this.metadata.getDefaultValues()[item];
        });
        return true;
      },
      isnewBattery() {
        return this.batteryId === 'null';
      },
      getAssociatedInputsCompleteness() {
        // loop through associatedInputs array and check complete param
        if (this.includeCycleDegradation) {
          if (this.associatedInputs[0]) {
            return this.associatedInputs[0].complete;
          }
          return false;
        }
        return true;
      },
      getBatteryFromStore() {
        return this.$store.getters.getBatteryById(this.batteryId);
      },
      getContinueLink() {
        if (this.includeCycleDegradation) {
          return `${this.associatedInputs[0].path}/${this.id}`;
        }
        return WIZARD_COMPONENT_PATH;
      },
      getErrorMsg(fieldName) {
        return this.getErrorMsgWrapped(validations, this.$v, this.metadata, fieldName);
      },
      makeErrorList() {
        const errors = [];
        Object.keys(this.metadata).forEach((key) => {
          if (this.$v[key].$invalid) {
            errors.push(this.getErrorMsg(key));
          }
        });
        return errors;
      },
      validatedSave() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.shouldEnergySize === true) {
          this.resetNonRequired(['energyCapacity']);
        }
        if (this.shouldPowerSize === true) {
          this.resetNonRequired(['powerCapacity', 'shouldDiffChargeDischarge',
            'chargingCapacity', 'dischargingCapacity']);
        }
        if (this.shouldPowerSize === false) {
          if (this.shouldDiffChargeDischarge === true) {
            this.resetNonRequired(['powerCapacity']);
          } else if (this.shouldDiffChargeDischarge === false) {
            this.resetNonRequired(['chargingCapacity', 'dischargingCapacity']);
          } else {
            this.resetNonRequired(['powerCapacity',
              'chargingCapacity', 'dischargingCapacity']);
          }
        }
        if (this.includeSizeLimits === false) {
          this.resetNonRequired(['powerCapacityMaximum', 'powerCapacityMinimum', 'energyCapacityMaximum', 'energyCapacityMinimum', 'chargingCapacityMaximum', 'chargingCapacityMinimum', 'dischargingCapacityMaximum', 'dischargingCapacityMinimum']);
        } else {
          if (this.shouldPowerSize === false) {
            this.resetNonRequired(['powerCapacityMaximum', 'powerCapacityMinimum']);
          }
          if (this.shouldEnergySize === false) {
            this.resetNonRequired(['energyCapacityMaximum', 'energyCapacityMinimum']);
          }
        }
        if ((this.shouldEnergySize === false) || (this.shouldPowerSize === false)) {
          this.resetNonRequired(['includeSizeLimits']);
        }
        if (this.shouldMaxDuration === false) {
          this.resetNonRequired(['maxDuration']);
        }
        if (this.shouldLimitDailyCycling === false) {
          this.resetNonRequired(['dailyCycleLimit']);
        }
        if (this.includeAuxiliaryLoad === false) {
          this.resetNonRequired(['auxiliaryLoad']);
        }
        // shared inputs: reset all non-required inputs to default
        if (this.isReplaceable === false) {
          this.resetNonRequired(['replacementCost', 'replacementCostPerkW', 'replacementCostPerkWh', 'replacementConstructionTime']);
        }
        if (this.salvageValueOption !== 'User defined') {
          this.resetNonRequired(['salvageValue']);
        }
        this.submitted = true;
        this.$v.$touch();
        // set complete to true or false
        this.componentSpecsComplete = !this.$v.$invalid;
        this.associatedInputsComplete = this.getAssociatedInputsCompleteness();
        this.complete = this.componentSpecsComplete && this.associatedInputsComplete;
        // populate errorList for this technology
        if (this.complete !== true) {
          this.errorList = this.makeErrorList();
        }
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
          associatedInputs: this.associatedInputs,
          associatedInputsComplete: this.associatedInputsComplete,
          auxiliaryLoad: this.auxiliaryLoad,
          calendarDegradationRate: this.calendarDegradationRate,
          capitalCost: this.capitalCost,
          capitalCostPerkW: this.capitalCostPerkW,
          capitalCostPerkWh: this.capitalCostPerkWh,
          chargingCapacity: this.chargingCapacity,
          chargingCapacityMaximum: this.chargingCapacityMaximum,
          chargingCapacityMinimum: this.chargingCapacityMinimum,
          complete: this.complete,
          constructionYear: this.constructionYear,
          dailyCycleLimit: this.dailyCycleLimit,
          dischargingCapacity: this.dischargingCapacity,
          dischargingCapacityMaximum: this.dischargingCapacityMaximum,
          dischargingCapacityMinimum: this.dischargingCapacityMinimum,
          decomissioningCost: this.decomissioningCost,
          energyCapacity: this.energyCapacity,
          energyCapacityMaximum: this.energyCapacityMaximum,
          energyCapacityMinimum: this.energyCapacityMinimum,
          expectedLifetime: this.expectedLifetime,
          errorList: this.errorList,
          fixedOMCosts: this.fixedOMCosts,
          id: this.id,
          includeAuxiliaryLoad: this.includeAuxiliaryLoad,
          includeCycleDegradation: this.includeCycleDegradation,
          includeSizeLimits: this.includeSizeLimits,
          isReplaceable: this.isReplaceable,
          lowerSOCLimit: this.lowerSOCLimit,
          macrsTerm: this.macrsTerm,
          maxDuration: this.maxDuration,
          name: this.name,
          operationYear: this.operationYear,
          path: this.path,
          powerCapacity: this.powerCapacity,
          powerCapacityMaximum: this.powerCapacityMaximum,
          powerCapacityMinimum: this.powerCapacityMinimum,
          replacementConstructionTime: this.replacementConstructionTime,
          replacementCost: this.replacementCost,
          replacementCostPerkW: this.replacementCostPerkW,
          replacementCostPerkWh: this.replacementCostPerkWh,
          roundtripEfficiency: this.roundtripEfficiency,
          salvageValue: this.salvageValue,
          salvageValueOption: this.salvageValueOption,
          selfDischargeRate: this.selfDischargeRate,
          shouldDiffChargeDischarge: this.shouldDiffChargeDischarge,
          shouldEnergySize: this.shouldEnergySize,
          shouldLimitDailyCycling: this.shouldLimitDailyCycling,
          shouldMaxDuration: this.shouldMaxDuration,
          shouldPowerSize: this.shouldPowerSize,
          componentSpecsComplete: this.componentSpecsComplete,
          stateOfHealth: this.stateOfHealth,
          tag: this.tag,
          targetSOC: this.targetSOC,
          technologyType: this.technologyType,
          ter: this.ter,
          upperSOCLimit: this.upperSOCLimit,
          variableOMCosts: this.variableOMCosts,
        };
      },
    },
  };
</script>
