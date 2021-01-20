<template>
  <div>
    <h3>Technology Specs: Single Electric Vehicle (EV)</h3>
    <hr />
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

        <text-input
          v-model="energyTarget"
          v-bind:field="metadata.energyTarget"
          :isInvalid="submitted && $v.energyTarget.$error"
          :errorMessage="getErrorMsg('energyTarget')">
        </text-input>

        <text-input
          v-model="maximumChargingPower"
          v-bind:field="metadata.maximumChargingPower"
          :isInvalid="submitted && $v.maximumChargingPower.$error"
          :errorMessage="getErrorMsg('maximumChargingPower')">
        </text-input>

        <text-input
          v-model="minimumChargingPower"
          v-bind:field="metadata.minimumChargingPower"
          :isInvalid="submitted && $v.minimumChargingPower.$error"
          :errorMessage="getErrorMsg('minimumChargingPower')">
        </text-input>

        <text-input
          v-model="plugInHour"
          v-bind:field="metadata.plugInHour"
          :isInvalid="submitted && $v.plugInHour.$error"
          :errorMessage="getErrorMsg('plugInHour')">
        </text-input>

        <text-input
          v-model="plugOutHour"
          v-bind:field="metadata.plugOutHour"
          :isInvalid="submitted && $v.plugOutHour.$error"
          :errorMessage="getErrorMsg('plugOutHour')">
        </text-input>

        <fieldset class="section-group">
          <legend>Cost Function</legend>

          <text-input
            v-model="capitalCost"
            v-bind:field="metadata.capitalCost"
            :isInvalid="submitted && $v.capitalCost.$error"
            :errorMessage="getErrorMsg('capitalCost')">
          </text-input>

        </fieldset>

        <text-input
          v-model="fixedOMCosts"
          v-bind:field="metadata.fixedOMCosts"
          :isInvalid="submitted && $v.fixedOMCosts.$error"
          :errorMessage="getErrorMsg('fixedOMCosts')">
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
          :isLargeBox="true"
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
          :continue-link="WIZARD_COMPONENT_PATH"
          :displayError="submitted && $v.$anyError"
          :save="validatedSave"
        />

      </div>
    </form>

  </div>
</template>

<script>
  import _ from 'lodash';
  import { requiredIf } from 'vuelidate/lib/validators';

  import wizardFormMixin from '@/mixins/wizardFormMixin';
  import TechnologySpecsSingleEVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSingleEV';
  import { WIZARD_COMPONENT_PATH } from '@/router/constants';

  const metadata = TechnologySpecsSingleEVMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    name: 'TechnologySpecsSingleEV',
    mixins: [wizardFormMixin],
    props: ['id'],
    data() {
      const values = this.getSingleEVFromStore();
      const valuesMinusId = _.pickBy(values, (value, key) => key !== 'id');
      return {
        metadata,
        values,
        ...valuesMinusId,
        WIZARD_COMPONENT_PATH,
      };
    },
    validations: {
      ...validations,
      replacementCost: {
        ...validations.replacementCost,
        required: requiredIf(function isReplacementCostRequired() {
          return (this.isReplaceable === true);
        }),
      },
      replacementConstructionTime: {
        ...validations.replacementConstructionTime,
        required: requiredIf(function isReplacementConstructionTimeRequired() {
          return (this.isReplaceable === true);
        }),
      },
      salvageValue: {
        ...validations.salvageValue,
        required: requiredIf(function isSalvageValueRequired() {
          return (this.salvageValueOption === 'User defined');
        }),
      },
      // plugOutHour: {
      //   ...validations.plugOutHour,
      //   minValue: !this.valueInHourRange(this.plugInHour) ? 1 : minValue(this.plugInHour),
      // },
    },
    beforeMount() {
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
      getSingleEVFromStore() {
        return this.$store.getters.getSingleEVById(this.id);
      },
      getErrorMsg(fieldName) {
        // plugOutHour dynamic validation
        this.metadata.plugOutHour.minValue = !this.valueInMonthRange(this.plugInHour)
          ? 1 : this.plugInHour;

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
        if (this.isReplaceable === false) {
          this.resetNonRequired(['replacementConstructionTime', 'replacementCost']);
        }
        if (this.salvageValueOption !== 'User defined') {
          this.resetNonRequired(['salvageValue']);
        }
        this.submitted = true;
        this.$v.$touch();
        // set complete to true or false
        this.complete = !this.$v.$invalid;
        // populate errorList for this technology
        if (this.complete !== true) {
          this.errorList = this.makeErrorList();
        }
        const singleEVSpec = this.buildSingleEV();
        const payload = {
          newSingleEV: singleEVSpec,
          id: this.id,
        };
        this.$store.dispatch('replaceTechnologySpecsSingleEV', payload);

        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      valueInRange(value, lowValue, highValue) {
        return (value >= lowValue && value <= highValue);
      },
      valueInHourRange(value) {
        return this.valueInRange(value, 1, 24);
      },
      buildSingleEV() {
        return {
          active: this.active,
          capitalCost: this.capitalCost,
          complete: this.complete,
          constructionYear: this.constructionYear,
          decomissioningCost: this.decomissioningCost,
          energyTarget: this.energyTarget,
          errorList: this.errorList,
          expectedLifetime: this.expectedLifetime,
          fixedOMCosts: this.fixedOMCosts,
          id: this.id,
          isReplaceable: this.isReplaceable,
          macrsTerm: this.macrsTerm,
          maximumChargingPower: this.maximumChargingPower,
          minimumChargingPower: this.minimumChargingPower,
          name: this.name,
          operationYear: this.operationYear,
          plugInHour: this.plugInHour,
          plugOutHour: this.plugOutHour,
          replacementCost: this.replacementCost,
          replacementConstructionTime: this.replacementConstructionTime,
          salvageValue: this.salvageValue,
          salvageValueOption: this.salvageValueOption,
          tag: this.tag,
          technologyType: this.technologyType,
          ter: this.ter,
        };
      },
    },
  };
</script>
