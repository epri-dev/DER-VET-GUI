<template>
  <div>
    <h3>Technology: Internal Combustion Engine Generator</h3>
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
          v-model="numGenerators"
          :metadata="metadata.numGenerators"
          :isInvalid="submitted && $v.numGenerators.$error"
          :errorMessage="getErrorMsg('numGenerators')">
        </text-input>

        <radio-button-input
          v-model="shouldSize"
          :metadata="metadata.shouldSize"
          :isInvalid="submitted && $v.shouldSize.$error"
          :errorMessage="getErrorMsg('shouldSize')">
        </radio-button-input>

        <div v-if="shouldSize === false">
          <text-input
            v-model="ratedCapacity"
            :metadata="metadata.ratedCapacity"
            :isInvalid="submitted && $v.ratedCapacity.$error"
            :errorMessage="getErrorMsg('ratedCapacity')">
          </text-input>
        </div>

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

        <text-input
          v-model="minimumPower"
          :metadata="metadata.minimumPower"
          :isInvalid="submitted && $v.minimumPower.$error"
          :errorMessage="getErrorMsg('minimumPower')">
        </text-input>

        <text-input
          v-model="efficiency"
          :metadata="metadata.efficiency"
          :isInvalid="submitted && $v.efficiency.$error"
          :errorMessage="getErrorMsg('efficiency')">
        </text-input>

        <radio-button-input
          v-model="fuelType"
          :metadata="metadata.fuelType"
          :isInvalid="submitted && $v.fuelType.$error"
          :errorMessage="getErrorMsg('fuelType')">
        </radio-button-input>

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

        </fieldset>

        <text-input
          v-model="variableOMCost"
          :metadata="metadata.variableOMCost"
          :isInvalid="submitted && $v.variableOMCost.$error"
          :errorMessage="getErrorMsg('variableOMCost')">
        </text-input>

        <text-input
          v-model="fixedOMCostIncludingExercise"
          :metadata="metadata.fixedOMCostIncludingExercise"
          :isInvalid="submitted && $v.fixedOMCostIncludingExercise.$error"
          :errorMessage="getErrorMsg('fixedOMCostIncludingExercise')">
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
  import { requiredIf, minValue } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import CollectionTypes from '@/models/Project/CollectionTypes';

  export default {
    name: 'TechnologySpecsICE',
    mixins: [wizardFormMixin],
    props: ['id'],
    data() {
      return this.getData(CollectionTypes.ICE, CollectionTypes.ICE);
    },
    validations() {
      const { validationSchema } = this;
      return {
        ...validationSchema,
        includeSizeLimits: {
          ...validationSchema.includeSizeLimits,
          required: requiredIf(function isIncludeSizeLimitsRequired() {
            return this.shouldSize;
          }),
        },
        ratedCapacity: {
          ...validationSchema.ratedCapacity,
          required: requiredIf(function isRatedCapacityRequired() {
            return !this.shouldSize;
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
            return (this.isReplaceable === true);
          }),
        },
        replacementCostPerkW: {
          ...validationSchema.replacementCostPerkW,
          required: requiredIf(function isReplacementCostPerkWRequired() {
            return (this.isReplaceable === true);
          }),
        },
        replacementConstructionTime: {
          ...validationSchema.replacementConstructionTime,
          required: requiredIf(function isReplacementConstructionTimeRequired() {
            return (this.isReplaceable === true);
          }),
        },
        salvageValue: {
          ...validationSchema.salvageValue,
          required: requiredIf(function isSalvageValueRequired() {
            return (this.salvageValueOption === 'User defined');
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
        if (this.isReplaceable === false) {
          this.resetNonRequired(['replacementConstructionTime', 'replacementCost', 'replacementCostPerkW']);
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
