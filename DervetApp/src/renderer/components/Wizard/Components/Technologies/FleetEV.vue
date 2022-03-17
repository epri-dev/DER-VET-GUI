<template>
  <div>
    <h3>Technology: Fleet Electric Vehicle (EV)</h3>
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
          v-model="lostLoadCost"
          :metadata="metadata.lostLoadCost"
          :isInvalid="submitted && $v.lostLoadCost.$error"
          :errorMessage="getErrorMsg('lostLoadCost')">
        </text-input>

        <text-input
          v-model="maximumLoadCtrl"
          :metadata="metadata.maximumLoadCtrl"
          :isInvalid="submitted && $v.maximumLoadCtrl.$error"
          :errorMessage="getErrorMsg('maximumLoadCtrl')">
        </text-input>

        <fieldset class="section-group">
          <legend>Cost Function</legend>

          <text-input
            v-model="capitalCost"
            :metadata="metadata.capitalCost"
            :isInvalid="submitted && $v.capitalCost.$error"
            :errorMessage="getErrorMsg('capitalCost')">
          </text-input>

        </fieldset>

        <text-input
          v-model="fixedOMCosts"
          :metadata="metadata.fixedOMCosts"
          :isInvalid="submitted && $v.fixedOMCosts.$error"
          :errorMessage="getErrorMsg('fixedOMCosts')">
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

        <hr/>

        <time-series-upload
          :chartKey="chartKey"
          :data="tsFleetEVBaselineLoadProfile"
          :metadata="metadata.tsFleetEVBaselineLoadProfile"
          :isInvalid="showTimeSeriesErrorMessage()"
          :validationErrorMessage="timeSeriesErrors.tsFleetEVBaselineLoadProfile"
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
  import { requiredIf } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import { CollectionType } from '@/models/Project/CollectionType';

  export default {
    name: 'TechnologySpecsFleetEV',
    mixins: [wizardFormMixin],
    props: ['id'],
    data() {
      return this.getData(CollectionType.FleetEV, CollectionType.FleetEV);
    },
    validations() {
      return {
        ...this.validationSchema,
        replacementCost: {
          ...this.validationSchema.replacementCost,
          required: requiredIf(function isReplacementCostRequired() {
            return (this.isReplaceable === true);
          }),
        },
        replacementConstructionTime: {
          ...this.validationSchema.replacementConstructionTime,
          required: requiredIf(function isReplacementConstructionTimeRequired() {
            return (this.isReplaceable === true);
          }),
        },
        salvageValue: {
          ...this.validationSchema.salvageValue,
          required: requiredIf(function isSalvageValueRequired() {
            // TODO use constant
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
      resetAllNonRequired() {
        // reset all non-required inputs to their defaults prior to saving
        if (this.isReplaceable === false) {
          this.resetNonRequired(['replacementConstructionTime', 'replacementCost']);
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
