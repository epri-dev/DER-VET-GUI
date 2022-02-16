<template>
  <div>
    <h3>Technology: Single Electric Vehicle (EV)</h3>
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
          v-model="energyTarget"
          :metadata="metadata.energyTarget"
          :isInvalid="submitted && $v.energyTarget.$error"
          :errorMessage="getErrorMsg('energyTarget')">
        </text-input>

        <text-input
          v-model="maximumChargingPower"
          :metadata="metadata.maximumChargingPower"
          :isInvalid="submitted && $v.maximumChargingPower.$error"
          :errorMessage="getErrorMsg('maximumChargingPower')">
        </text-input>

        <text-input
          v-model="minimumChargingPower"
          :metadata="metadata.minimumChargingPower"
          :isInvalid="submitted && $v.minimumChargingPower.$error"
          :errorMessage="getErrorMsg('minimumChargingPower')">
        </text-input>

        <text-input
          v-model="plugInHour"
          :metadata="metadata.plugInHour"
          :isInvalid="submitted && $v.plugInHour.$error"
          :errorMessage="getErrorMsg('plugInHour')">
        </text-input>

        <text-input
          v-model="plugOutHour"
          :metadata="metadata.plugOutHour"
          :isInvalid="submitted && $v.plugOutHour.$error"
          :errorMessage="getErrorMsg('plugOutHour')">
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
    name: 'TechnologySpecsSingleEV',
    mixins: [wizardFormMixin],
    props: ['id'],
    data() {
      return this.getData(CollectionTypes.SingleEV, CollectionTypes.SingleEV);
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
            return (this.salvageValueOption === 'User defined');
          }),
        },
        plugOutHour: {
          ...this.validationSchema.plugOutHour,
          minValue: !this.valueInRange(this.plugInHour, 0, 22)
            ? 1 : minValue(this.plugInHour + 1),
        },
        maximumChargingPower: {
          ...this.validationSchema.maximumChargingPower,
          minValue: !(this.minimumChargingPower >= 0)
            ? 0 : minValue(this.minimumChargingPower),
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
      valueInRange(value, lowValue, highValue) {
        return (value >= lowValue && value <= highValue);
      },
      getErrorMsg(fieldName) {
        // plugOutHour dynamic validation
        this.metadata.plugOutHour.minValue = !this.valueInRange(this.plugInHour, 0, 22)
          ? 1 : (this.plugInHour + 1);
        this.metadata.maximumChargingPower.minValue = !(this.minimumChargingPower >= 0)
          ? 0 : this.minimumChargingPower;

        return this.getErrorMsgWrapped(this.validationSchema, this.$v, fieldName);
      },
      resetAllNonRequired() {
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
