<template>
  <div>
    <h3>Technology: Solar PV</h3>
    <hr />

    <form>
      <div class="form-horizontal form-buffer container">

        <text-input
          v-model="name"
          :metadata="metadata.name"
          :isInvalid="submitted && $v.name.$error"
          :errorMessage="getErrorMsg('name')">
        </text-input>

        <text-input
          v-model="cost"
          :metadata="metadata.cost"
          :isInvalid="submitted && $v.cost.$error"
          :errorMessage="getErrorMsg('cost')">
        </text-input>

        <radio-button-input
          v-model="shouldSize"
          :metadata="metadata.shouldSize"
          :isInvalid="submitted && $v.shouldSize.$error"
          :errorMessage="getErrorMsg('shouldSize')">
        </radio-button-input>

        <text-input
          v-if="shouldSize === false"
          v-model="ratedCapacity"
          :metadata="metadata.ratedCapacity"
          :isInvalid="submitted && $v.ratedCapacity.$error"
          :errorMessage="getErrorMsg('ratedCapacity')">
        </text-input>

        <div v-if="shouldSize === true">

          <radio-button-input
            v-model="includeSizeLimits"
            :metadata="metadata.includeSizeLimits"
            :isInvalid="submitted && $v.includeSizeLimits.$error"
            :errorMessage="getErrorMsg('includeSizeLimits')">
          </radio-button-input>

          <div v-if="includeSizeLimits === true">

            <text-input
              v-model="ratedCapacityMaximum"
              :metadata="metadata.ratedCapacityMaximum"
              :isInvalid="submitted && $v.ratedCapacityMaximum.$error"
              :errorMessage="getErrorMsg('ratedCapacityMaximum')">
            </text-input>

            <text-input
              v-model="ratedCapacityMinimum"
              :metadata="metadata.ratedCapacityMinimum"
              :isInvalid="submitted && $v.ratedCapacityMinimum.$error"
              :errorMessage="getErrorMsg('ratedCapacityMinimum')">
            </text-input>
          </div>
        </div>

        <drop-down-input
          v-if="activeBatteryExists"
          v-model="loc"
          :metadata="metadata.loc"
          :isInvalid="submitted && $v.loc.$error"
          :errorMessage="getErrorMsg('loc')">
        </drop-down-input>

        <radio-button-input
          v-if="isLocAC && activeBatteryExists"
          v-model="allowGridCharge"
          :metadata="metadata.allowGridCharge"
          :isInvalid="submitted && $v.allowGridCharge.$error"
          :errorMessage="getErrorMsg('allowGridCharge')">
        </radio-button-input>

        <text-input
          v-model="inverterMax"
          :metadata="metadata.inverterMax"
          :isInvalid="submitted && $v.inverterMax.$error"
          :isLargeBox="true"
          :errorMessage="getErrorMsg('inverterMax')">
        </text-input>

        <radio-button-input
          v-model="includeCurtailment"
          :metadata="metadata.includeCurtailment"
          :isInvalid="submitted && $v.includeCurtailment.$error"
          :errorMessage="getErrorMsg('includeCurtailment')">
        </radio-button-input>

        <fieldset class="section-group" v-if="reliabilitySelected">
          <legend>Generation Variation</legend>

          <text-input
            v-model="nu"
            :metadata="metadata.nu"
            :isInvalid="submitted && $v.nu.$error"
            :errorMessage="getErrorMsg('nu')">
          </text-input>
          <text-input
            v-model="gamma"
            :metadata="metadata.gamma"
            :isInvalid="submitted && $v.gamma.$error"
            :errorMessage="getErrorMsg('gamma')">
          </text-input>
        </fieldset>

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

        <text-input
          v-model="ter"
          :metadata="metadata.ter"
          :isInvalid="submitted && $v.ter.$error"
          :errorMessage="getErrorMsg('ter')">
        </text-input>

        <radio-button-input
          v-model="includePPA"
          :metadata="metadata.includePPA"
          :isInvalid="submitted && $v.includePPA.$error"
          :errorMessage="getErrorMsg('includePPA')">
        </radio-button-input>

        <div v-if="includePPA === true">
          <text-input
            v-model="ppaCost"
            :metadata="metadata.ppaCost"
            :isInvalid="submitted && $v.ppaCost.$error"
            :errorMessage="getErrorMsg('ppaCost')">
          </text-input>

          <text-input
            v-model="ppaInflationRate"
            :metadata="metadata.ppaInflationRate"
            :isInvalid="submitted && $v.ppaInflationRate.$error"
            :errorMessage="getErrorMsg('ppaInflationRate')">
          </text-input>
        </div>

        <text-input
          v-if="includePPA === false"
          v-model="fixedOMCosts"
          :metadata="metadata.fixedOMCosts"
          :isInvalid="submitted && $v.fixedOMCosts.$error"
          :errorMessage="getErrorMsg('fixedOMCosts')">
        </text-input>

        <radio-button-input
          v-model="isReplaceable"
          :metadata="metadata.isReplaceable"
          :isInvalid="submitted && $v.isReplaceable.$error"
          :errorMessage="getErrorMsg('isReplaceable')">
        </radio-button-input>

        <div v-if="includePPA === false">
          <div v-if="isReplaceable === true">
            <text-input
              v-model="replacementConstructionTime"
              :metadata="metadata.replacementConstructionTime"
              :isInvalid="submitted && $v.replacementConstructionTime.$error"
              :errorMessage="getErrorMsg('replacementConstructionTime')">
            </text-input>

            <text-input
              v-model="replacementCost"
              :metadata="metadata.replacementCost"
              :isInvalid="submitted && $v.replacementCost.$error"
              :errorMessage="getErrorMsg('replacementCost')">
            </text-input>
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
            :isLargeBox="true"
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

          <drop-down-input
            v-model="macrsTerm"
            :metadata="metadata.macrsTerm"
            :isInvalid="submitted && $v.macrsTerm.$error"
            :errorMessage="getErrorMsg('macrsTerm')">
          </drop-down-input>
        </div>

        <hr>

        <time-series-upload
          :chartKey="chartKey"
          :data="tsSolarPVGenerationProfile"
          :metadata="metadata.tsSolarPVGenerationProfile"
          :isInvalid="showTimeSeriesErrorMessage()"
          :validationErrorMessage="timeSeriesErrors.tsSolarPVGenerationProfile"
          @data="setData"
        />

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
  import { requiredIf, minValue } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import { LocType } from '@/models/Project/Metadata/TechnologySpecs/SolarPV';
  import CollectionTypes from '@/models/Project/CollectionTypes';

export default {
    name: 'TechnologySpecsSolarPV',
    mixins: [wizardFormMixin],
    props: ['id'],
    data() {
      return this.getData(CollectionTypes.SolarPV, CollectionTypes.SolarPV);
    },
    validations() {
      const { validationSchema } = this;
      return {
        ...validationSchema,
        allowGridCharge: {
          ...validationSchema.allowGridCharge,
          required: requiredIf(function isAllowGridChargeRequired() {
            return (this.loc === LocType.AC) && this.activeBatteryExists;
          }),
        },
        decomissioningCost: {
          ...validationSchema.decomissioningCost,
          required: requiredIf(function isDecomissioningCostRequired() {
            return (this.includePPA === false);
          }),
        },
        fixedOMCosts: {
          ...validationSchema.fixedOMCosts,
          required: requiredIf(function isFixedOMCostsRequired() {
            return (this.includePPA === false);
          }),
        },
        gamma: {
          ...validationSchema.gamma,
          required: requiredIf(function isGammaRequired() {
            return this.reliabilitySelected;
          }),
        },
        includeSizeLimits: {
          ...validationSchema.includeSizeLimits,
          required: requiredIf(function isIncludeSizeLimitsRequired() {
            return (this.shouldSize === true);
          }),
        },
        macrsTerm: {
          ...validationSchema.macrsTerm,
          required: requiredIf(function isMacrsTermRequired() {
            return (this.includePPA === false);
          }),
        },
        nu: {
          ...validationSchema.nu,
          required: requiredIf(function isNuRequired() {
            return this.reliabilitySelected;
          }),
        },
        ppaCost: {
          ...validationSchema.ppaCost,
          required: requiredIf(function isPpaCostRequired() {
            return (this.includePPA === true);
          }),
        },
        ppaInflationRate: {
          ...validationSchema.ppaInflationRate,
          required: requiredIf(function isPpaInflationRateRequired() {
            return (this.includePPA === true);
          }),
        },
        ratedCapacity: {
          ...validationSchema.ratedCapacity,
          required: requiredIf(function isRatedCapacityRequired() {
            return this.shouldSize === false;
          }),
        },
        ratedCapacityMaximum: {
          ...validationSchema.ratedCapacityMaximum,
          required: requiredIf(function isRatedCapacityMaximumRequired() {
            return (this.includeSizeLimits === true) && (this.shouldSize === true);
          }),
          minValue: !(this.ratedCapacityMinimum >= 1)
            ? 1 : minValue(this.ratedCapacityMinimum),
        },
        ratedCapacityMinimum: {
          ...validationSchema.ratedCapacityMinimum,
          required: requiredIf(function isRatedCapacityMinimumRequired() {
            return (this.includeSizeLimits === true) && (this.shouldSize === true);
          }),
        },
        replacementCost: {
          ...validationSchema.replacementCost,
          required: requiredIf(function isReplacementCostRequired() {
            return (this.isReplaceable === true) && (this.includePPA === false);
          }),
        },
        replacementConstructionTime: {
          ...validationSchema.replacementConstructionTime,
          required: requiredIf(function isReplacementConstructionTimeRequired() {
            return (this.isReplaceable === true) && (this.includePPA === false);
          }),
        },
        salvageValue: {
          ...validationSchema.salvageValue,
          required: requiredIf(function isSalvageValueRequired() {
            return (this.salvageValueOption === 'User defined') && (this.includePPA === false);
          }),
        },
        salvageValueOption: {
          ...validationSchema.salvageValueOption,
          required: requiredIf(function isSalvageValueOptionRequired() {
            return (this.includePPA === false);
          }),
        },
      };
    },
    beforeMount() {
      // TODO fix this
      // in quick start mode, do a save initially to reset non-required inputs
      if (this.complete === true && this.submitted === false) {
        this.resetAllNonRequired();
      }
    },
    computed: {
      activeBatteryExists() {
        return this.$store.getters.activeBatteryExists;
      },
      isLocAC() {
        return this.loc === LocType.AC;
      },
      reliabilitySelected() {
        return this.$store.state.Project.objectivesResilience;
      },
    },
    methods: {
      getErrorMsg(fieldName) {
        this.metadata.ratedCapacityMaximum.minValue = !(this.ratedCapacityMinimum >= 1)
          ? 1 : this.ratedCapacityMinimum;
        return this.getErrorMsgWrapped(this.validationSchema, this.$v, fieldName);
      },
      resetAllNonRequired() {
        if (this.shouldSize === true) {
          this.resetNonRequired(['ratedCapacity']);
          if (this.includeSizeLimits === false) {
            this.resetNonRequired(['ratedCapacityMaximum', 'ratedCapacityMinimum']);
          }
        } else {
          this.resetNonRequired(['includeSizeLimits']);
        }
        if (!this.reliabilitySelected) {
          this.resetNonRequired(['gamma', 'nu']);
        }
        if (this.includePPA) {
          this.resetNonRequired(['decomissioningCost', 'fixedOMCosts', 'macrsTerm', 'replacementCost', 'replacementConstructionTime', 'salvageValueOption', 'salvageValue']);
        }
        if (this.includePPA === false) {
          this.resetNonRequired(['ppaCost', 'ppaInflationRate']);
        }
        // shared inputs: reset all non-required inputs to default
        if (this.isReplaceable === false) {
          this.resetNonRequired(['replacementConstructionTime', 'replacementCost']);
        }
        if (this.salvageValueOption !== 'User defined') {
          this.resetNonRequired(['salvageValue']);
        }
        // TODO May need to do a reset on loc
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
