<template>
  <div>
    <h3>Technology: Battery Storage</h3>
    <hr />

    <form>
      <div class="form-horizontal form-buffer container">
        <text-input
          v-model="name"
          :metadata="metadata.name"
          :isInvalid="submitted && $v.name.$error"
          :errorMessage="getErrorMsg('name')">
        </text-input>

        <radio-button-input
          v-model="shouldEnergySize"
          :metadata="metadata.shouldEnergySize"
          :isInvalid="submitted && $v.shouldEnergySize.$error"
          :errorMessage="getErrorMsg('shouldEnergySize')">
        </radio-button-input>

        <div v-if="shouldEnergySize === false">
          <text-input
            v-model="energyCapacity"
            :metadata="metadata.energyCapacity"
            :isInvalid="submitted && $v.energyCapacity.$error"
            :errorMessage="getErrorMsg('energyCapacity')">
          </text-input>
        </div>

        <radio-button-input
          v-model="shouldPowerSize"
          :metadata="metadata.shouldPowerSize"
          :isInvalid="submitted && $v.shouldPowerSize.$error"
          :errorMessage="getErrorMsg('shouldPowerSize')">
        </radio-button-input>

        <div v-if="shouldPowerSize === false">
          <radio-button-input
            v-model="shouldDiffChargeDischarge"
            :metadata="metadata.shouldDiffChargeDischarge"
            :isInvalid="submitted && $v.shouldDiffChargeDischarge.$error"
            :errorMessage="getErrorMsg('shouldDiffChargeDischarge')">
          </radio-button-input>

          <div v-if="shouldDiffChargeDischarge === true">
            <text-input
              v-model="chargingCapacity"
              :metadata="metadata.chargingCapacity"
              :isInvalid="submitted && $v.chargingCapacity.$error"
              :errorMessage="getErrorMsg('chargingCapacity')">
            </text-input>
            <text-input
              v-model="dischargingCapacity"
              :metadata="metadata.dischargingCapacity"
              :isInvalid="submitted && $v.dischargingCapacity.$error"
              :errorMessage="getErrorMsg('dischargingCapacity')">
            </text-input>
          </div>

          <div v-if="shouldDiffChargeDischarge === false">
            <text-input
              v-model="powerCapacity"
              :metadata="metadata.powerCapacity"
              :isInvalid="submitted && $v.powerCapacity.$error"
              :errorMessage="getErrorMsg('powerCapacity')">
            </text-input>
          </div>
        </div>

        <div v-if="(shouldPowerSize === true) || (shouldEnergySize === true)">
          <radio-button-input
            v-model="includeSizeLimits"
            :metadata="metadata.includeSizeLimits"
            :isInvalid="submitted && $v.includeSizeLimits.$error"
            :errorMessage="getErrorMsg('includeSizeLimits')">
          </radio-button-input>

          <div v-if="(includeSizeLimits === true) && (shouldPowerSize === true)">
            <text-input
              v-model="powerCapacityMaximum"
              :metadata="metadata.powerCapacityMaximum"
              :isInvalid="submitted && $v.powerCapacityMaximum.$error"
              :errorMessage="getErrorMsg('powerCapacityMaximum')">
            </text-input>

            <text-input
              v-model="powerCapacityMinimum"
              :metadata="metadata.powerCapacityMinimum"
              :isInvalid="submitted && $v.powerCapacityMinimum.$error"
              :errorMessage="getErrorMsg('powerCapacityMinimum')">
            </text-input>
          </div>

          <div v-if="(includeSizeLimits === true) && (shouldEnergySize === true)">
            <text-input
              v-model="energyCapacityMaximum"
              :metadata="metadata.energyCapacityMaximum"
              :isInvalid="submitted && $v.energyCapacityMaximum.$error"
              :errorMessage="getErrorMsg('energyCapacityMaximum')">
            </text-input>

            <text-input
              v-model="energyCapacityMinimum"
              :metadata="metadata.energyCapacityMinimum"
              :isInvalid="submitted && $v.energyCapacityMinimum.$error"
              :errorMessage="getErrorMsg('energyCapacityMinimum')">
            </text-input>
          </div>
        </div>

        <radio-button-input
          v-model="shouldMaxDuration"
          :metadata="metadata.shouldMaxDuration"
          :isInvalid="submitted && $v.shouldMaxDuration.$error"
          :errorMessage="getErrorMsg('shouldMaxDuration')">
        </radio-button-input>

        <div v-if="shouldMaxDuration === true">
          <text-input
            v-model="maxDuration"
            :metadata="metadata.maxDuration"
            :isInvalid="submitted && $v.maxDuration.$error"
            :errorMessage="getErrorMsg('maxDuration')">
          </text-input>
        </div>

        <text-input
          v-model="roundtripEfficiency"
          :metadata="metadata.roundtripEfficiency"
          :isInvalid="submitted && $v.roundtripEfficiency.$error"
          :errorMessage="getErrorMsg('roundtripEfficiency')">
        </text-input>

        <fieldset class="section-group">
          <legend>State of Charge</legend>

          <text-input
            v-model="upperSOCLimit"
            :metadata="metadata.upperSOCLimit"
            :isInvalid="submitted && $v.upperSOCLimit.$error"
            :errorMessage="getErrorMsg('upperSOCLimit')">
          </text-input>
          <text-input
            v-model="targetSOC"
            :metadata="metadata.targetSOC"
            :isInvalid="submitted && $v.targetSOC.$error"
            :errorMessage="getErrorMsg('targetSOC')">
          </text-input>
          <text-input
            v-model="lowerSOCLimit"
            :metadata="metadata.lowerSOCLimit"
            :isInvalid="submitted && $v.lowerSOCLimit.$error"
            :errorMessage="getErrorMsg('lowerSOCLimit')">
          </text-input>
          <text-input
            v-model="selfDischargeRate"
            :metadata="metadata.selfDischargeRate"
            :isInvalid="submitted && $v.selfDischargeRate.$error"
            :errorMessage="getErrorMsg('selfDischargeRate')">
          </text-input>

        </fieldset>

        <radio-button-input
          v-model="shouldLimitDailyCycling"
          :metadata="metadata.shouldLimitDailyCycling"
          :isInvalid="submitted && $v.shouldLimitDailyCycling.$error"
          :errorMessage="getErrorMsg('shouldLimitDailyCycling')">
        </radio-button-input>

        <div v-if="shouldLimitDailyCycling === true">
          <text-input
            v-model="dailyCycleLimit"
            :metadata="metadata.dailyCycleLimit"
            :isInvalid="submitted && $v.dailyCycleLimit.$error"
            :errorMessage="getErrorMsg('dailyCycleLimit')">
          </text-input>
        </div>

        <fieldset class="section-group">
          <legend>Cycle Degradation</legend>

          <radio-button-input
            v-model="includeCycleDegradation"
            :metadata="metadata.includeCycleDegradation"
            :isInvalid="submitted && $v.includeCycleDegradation.$error"
            :errorMessage="getErrorMsg('includeCycleDegradation')">
          </radio-button-input>

          <div v-if="includeCycleDegradation === true">
            <text-input
              v-model="calendarDegradationRate"
              :metadata="metadata.calendarDegradationRate"
              :isInvalid="submitted && $v.calendarDegradationRate.$error"
              :errorMessage="getErrorMsg('calendarDegradationRate')">
            </text-input>

            <text-input
              v-model="stateOfHealth"
              :metadata="metadata.stateOfHealth"
              :isInvalid="submitted && $v.stateOfHealth.$error"
              :errorMessage="getErrorMsg('stateOfHealth')">
            </text-input>

            <battery-cycle-life-curve
              :cycleLifeCurve="cycleLifeCurve"
              :isInvalid="isCycleLifeInvalid()"
              :errorMessage="cycleLifeErrorMessage"
              @change="onCycleLifeCurveChange"
              @error="onCycleLifeErrorChange"
            />
          </div>
        </fieldset>

        <radio-button-input
          v-model="includeAuxiliaryLoad"
          :metadata="metadata.includeAuxiliaryLoad"
          :isInvalid="submitted && $v.includeAuxiliaryLoad.$error"
          :errorMessage="getErrorMsg('includeAuxiliaryLoad')">
        </radio-button-input>

        <div v-if="includeAuxiliaryLoad === true">
          <text-input
            v-model="auxiliaryLoad"
            :metadata="metadata.auxiliaryLoad"
            :isInvalid="submitted && $v.auxiliaryLoad.$error"
            :errorMessage="getErrorMsg('auxiliaryLoad')">
          </text-input>
        </div>

        <fieldset class="section-group">
          <legend>Cost Function</legend>

          <text-input
            v-model="capitalCost"
            :metadata="metadata.capitalCost"
            :isInvalid="submitted && $v.capitalCost.$error"
            :errorMessage="getErrorMsg('capitalCost')">
          </text-input>

          <text-input
            v-model="capitalCostPerkW"
            :metadata="metadata.capitalCostPerkW"
            :isInvalid="submitted && $v.capitalCostPerkW.$error"
            :errorMessage="getErrorMsg('capitalCostPerkW')">
          </text-input>

          <text-input
            v-model="capitalCostPerkWh"
            :metadata="metadata.capitalCostPerkWh"
            :isInvalid="submitted && $v.capitalCostPerkWh.$error"
            :errorMessage="getErrorMsg('capitalCostPerkWh')">
          </text-input>

        </fieldset>

        <text-input
          v-model="fixedOMCosts"
          :metadata="metadata.fixedOMCosts"
          :isInvalid="submitted && $v.fixedOMCosts.$error"
          :errorMessage="getErrorMsg('fixedOMCosts')">
        </text-input>

        <text-input
          v-model="variableOMCosts"
          :metadata="metadata.variableOMCosts"
          :isInvalid="submitted && $v.variableOMCosts.$error"
          :errorMessage="getErrorMsg('variableOMCosts')">
        </text-input>

        <text-input
          v-model="constructionYear"
          :metadata="metadata.constructionYear"
          :isInvalid="submitted && $v.constructionYear.$error"
          :errorMessage="getErrorMsg('constructionYear')">
        </text-input>

        <text-input
          v-model="operationYear"
          :metadata="metadata.operationYear"
          :isInvalid="submitted && $v.operationYear.$error"
          :errorMessage="getErrorMsg('operationYear')">
        </text-input>

        <text-input
          v-model="expectedLifetime"
          :metadata="metadata.expectedLifetime"
          :isInvalid="submitted && $v.expectedLifetime.$error"
          :errorMessage="getErrorMsg('expectedLifetime')">
        </text-input>

        <radio-button-input
          v-model="isReplaceable"
          :metadata="metadata.isReplaceable"
          :isInvalid="submitted && $v.isReplaceable.$error"
          :errorMessage="getErrorMsg('isReplaceable')">
        </radio-button-input>

        <div v-if="isReplaceable === true">
          <text-input
            v-model="replacementConstructionTime"
            :metadata="metadata.replacementConstructionTime"
            :isInvalid="submitted && $v.replacementConstructionTime.$error"
            :errorMessage="getErrorMsg('replacementConstructionTime')">
          </text-input>

          <fieldset class="section-group">
            <legend>Replacement Cost Function</legend>
            <text-input
              v-model="replacementCost"
              :metadata="metadata.replacementCost"
              :isInvalid="submitted && $v.replacementCost.$error"
              :errorMessage="getErrorMsg('replacementCost')">
            </text-input>

            <text-input
              v-model="replacementCostPerkW"
              :metadata="metadata.replacementCostPerkW"
              :isInvalid="submitted && $v.replacementCostPerkW.$error"
              :errorMessage="getErrorMsg('replacementCostPerkW')">
            </text-input>
            <text-input
              v-model="replacementCostPerkWh"
              :metadata="metadata.replacementCostPerkWh"
              :isInvalid="submitted && $v.replacementCostPerkWh.$error"
              :errorMessage="getErrorMsg('replacementCostPerkWh')">
            </text-input>
          </fieldset>
        </div>

        <text-input
          v-model="decomissioningCost"
          :metadata="metadata.decomissioningCost"
          :isInvalid="submitted && $v.decomissioningCost.$error"
          :errorMessage="getErrorMsg('decomissioningCost')">
        </text-input>

        <drop-down-input
          v-model="salvageValueOption"
          :metadata="metadata.salvageValueOption"
          :isInvalid="submitted && $v.salvageValueOption.$error"
          :errorMessage="getErrorMsg('salvageValueOption')">
        </drop-down-input>

        <div v-if="salvageValueOption === 'User defined'">
          <text-input
            v-model="salvageValue"
            :metadata="metadata.salvageValue"
            :isInvalid="submitted && $v.salvageValue.$error"
            :errorMessage="getErrorMsg('salvageValue')">
          </text-input>
        </div>

        <text-input
          v-model="ter"
          :metadata="metadata.ter"
          :isInvalid="submitted && $v.ter.$error"
          :errorMessage="getErrorMsg('ter')">
        </text-input>

        <drop-down-input
          v-model="macrsTerm"
          :metadata="metadata.macrsTerm"
          :isInvalid="submitted && $v.macrsTerm.$error"
          :errorMessage="getErrorMsg('macrsTerm')">
        </drop-down-input>

        <nav-buttons
          :show-error="showSaveButtonErrorMessage()"
          :on-left-click="validatedSave"
          :on-right-click="validatedSaveContinue"
        />

      </div>
    </form>

  </div>
</template>

<script>
  import _ from 'lodash';
  // import { mapGetters } from 'vuex';
  import { requiredIf, minValue } from 'vuelidate/lib/validators';

  import BatteryCycleLifeCurve from '@/components/Wizard/Components/Technologies/BatteryCycleLifeCurve';
  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import { CollectionType } from '@/models/Project/CollectionType';

  export default {
    name: 'TechnologySpecsBattery',
    components: {
      BatteryCycleLifeCurve,
    },
    mixins: [wizardFormMixin],
    props: ['id'],
    data() {
      const data = this.getData(CollectionType.Battery, CollectionType.Battery);
      return {
        ...data,
        cycleLifeCurve: _.cloneDeep(data.cycleLifeCurve),
        cycleLifeErrorMessage: this.getCycleLifeError(),
      };
    },
    validations() {
      const { validationSchema } = this;
      return {
        ...validationSchema,
        auxiliaryLoad: {
          ...validationSchema.auxiliaryLoad,
          required: requiredIf(function isAuxiliaryLoadRequired() {
            return (this.includeAuxiliaryLoad === true);
          }),
        },
        calendarDegradationRate: {
          ...validationSchema.calendarDegradationRate,
          required: requiredIf(function isCalendarDegradationRateRequired() {
            return (this.includeCycleDegradation === true);
          }),
        },
        chargingCapacity: {
          ...validationSchema.chargingCapacity,
          required: requiredIf(function isChargingCapacityRequired() {
            return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === true);
          }),
        },
        dailyCycleLimit: {
          ...validationSchema.dailyCycleLimit,
          required: requiredIf(function isDailyCycleLimitRequired() {
            return (this.shouldLimitDailyCycling === true);
          }),
        },
        dischargingCapacity: {
          ...validationSchema.dischargingCapacity,
          required: requiredIf(function isDischargingCapacityRequired() {
            return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === true);
          }),
        },
        energyCapacity: {
          ...validationSchema.energyCapacity,
          required: requiredIf(function isEnergyCapacityRequired() {
            return this.shouldEnergySize === false;
          }),
        },
        energyCapacityMaximum: {
          ...validationSchema.energyCapacityMaximum,
          required: requiredIf(function isEnergyCapacityMaximumRequired() {
            return (this.includeSizeLimits === true) && (this.shouldEnergySize === true);
          }),
          minValue: !(this.energyCapacityMinimum >= 0)
            ? 0 : minValue(this.energyCapacityMinimum),
        },
        energyCapacityMinimum: {
          ...validationSchema.energyCapacityMinimum,
          required: requiredIf(function isEnergyCapacityMinimumRequired() {
            return (this.includeSizeLimits === true) && (this.shouldEnergySize === true);
          }),
        },
        includeSizeLimits: {
          ...validationSchema.includeSizeLimits,
          required: requiredIf(function isIncludeSizeLimitsRequired() {
            return this.shouldEnergySize || this.shouldPowerSize;
          }),
        },
        maxDuration: {
          ...validationSchema.maxDuration,
          required: requiredIf(function isMaxDurationRequired() {
            return (this.shouldMaxDuration === true);
          }),
        },
        powerCapacity: {
          ...validationSchema.powerCapacity,
          required: requiredIf(function isPowerCapacityRequired() {
            return (this.shouldPowerSize === false) && (this.shouldDiffChargeDischarge === false);
          }),
        },
        powerCapacityMaximum: {
          ...validationSchema.powerCapacityMaximum,
          required: requiredIf(function isPowerCapacityMaximumRequired() {
            return (this.includeSizeLimits === true) && (this.shouldPowerSize === true);
          }),
          minValue: !(this.powerCapacityMinimum >= 1)
            ? 1 : minValue(this.powerCapacityMinimum),
        },
        powerCapacityMinimum: {
          ...validationSchema.powerCapacityMinimum,
          required: requiredIf(function isPowerCapacityMinimumRequired() {
            return (this.includeSizeLimits === true) && (this.shouldPowerSize === true);
          }),
        },
        replacementCost: {
          ...validationSchema.replacementCost,
          required: requiredIf(function isReplacementCostRequired() {
            return (this.isReplaceable === true);
          }),
        },
        replacementCostPerkW: {
          ...validationSchema.replacementCostPerkW,
          required: requiredIf(function isReplacementCostPerkWRequired() {
            return (this.isReplaceable === true);
          }),
        },
        replacementCostPerkWh: {
          ...validationSchema.replacementCostPerkWh,
          required: requiredIf(function isReplacementCostPerkWhRequired() {
            return (this.isReplaceable === true);
          }),
        },
        replacementConstructionTime: {
          ...validationSchema.replacementConstructionTime,
          required: requiredIf(function isReplacementConstructionTimeRequired() {
            return (this.isReplaceable === true);
          }),
        },
        stateOfHealth: {
          ...validationSchema.stateOfHealth,
          required: requiredIf(function isStateOfHealthRequired() {
            return (this.includeCycleDegradation === true);
          }),
        },
        salvageValue: {
          ...validationSchema.salvageValue,
          required: requiredIf(function isSalvageValueRequired() {
            return (this.salvageValueOption === 'User defined');
          }),
        },
        shouldDiffChargeDischarge: {
          ...validationSchema.shouldDiffChargeDischarge,
          required: requiredIf(function isShouldDiffChargeDischargeRequired() {
            return this.shouldPowerSize === false;
          }),
        },
      };
    },
    beforeMount() {
      // in quick start mode, do a save initially to reset non-required inputs
      if (this.complete === true && this.submitted === false) {
        this.validatedSave();
      }
    },
    methods: {
      getErrorMsg(fieldName) {
        this.metadata.energyCapacityMaximum.minValue = !(this.energyCapacityMinimum >= 0)
          ? 0 : this.energyCapacityMinimum;
        this.metadata.powerCapacityMaximum.minValue = !(this.powerCapacityMinimum >= 1)
          ? 1 : this.powerCapacityMinimum;
        return this.getErrorMsgWrapped(this.validationSchema, this.$v, fieldName);
      },
      getCycleLifeError() {
        return this.$store.getters['Application/getPageErrors'](CollectionType.Battery, this.id).cycleLifeCurve;
      },
      getOtherError() {
        return (this.cycleLifeErrorMessage === undefined || this.cycleLifeErrorMessage === null)
          ? {} : { cycleLifeCurve: this.cycleLifeErrorMessage };
      },
      onCycleLifeCurveChange(cycles) {
        this.cycleLifeCurve = cycles;
      },
      onCycleLifeErrorChange(error) {
        this.cycleLifeErrorMessage = error;
      },
      isCycleLifeInvalid() {
        return (this.submitted && this.includeCycleDegradation === true) && (
          this.cycleLifeErrorMessage !== undefined && this.cycleLifeErrorMessage !== null
        );
      },
      resetAllNonRequired() {
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
          this.resetNonRequired([
            'powerCapacityMaximum',
            'powerCapacityMinimum',
            'energyCapacityMaximum',
            'energyCapacityMinimum',
          ]);
        } else {
          if (this.shouldPowerSize === false) {
            this.resetNonRequired(['powerCapacityMaximum', 'powerCapacityMinimum']);
          }
          if (this.shouldEnergySize === false) {
            this.resetNonRequired(['energyCapacityMaximum', 'energyCapacityMinimum']);
          }
        }
        if ((this.shouldEnergySize === false) && (this.shouldPowerSize === false)) {
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
        if (this.includeCycleDegradation === false) {
          this.resetNonRequired(['calendarDegradationRate', 'stateOfHealth', 'cycleLifeCurve']);
        }
        if (this.isReplaceable === false) {
          this.resetNonRequired(['replacementCost', 'replacementCostPerkW', 'replacementCostPerkWh', 'replacementConstructionTime']);
        }
        if (this.salvageValueOption !== 'User defined') {
          this.resetNonRequired(['salvageValue']);
        }
      },
      validatedSave() {
        this.resetAllNonRequired();
        wizardFormMixin.methods.validatedSave.bind(this)();
      },
      save() {
        this.saveCollectionItem();
      },
    },
  };
</script>
