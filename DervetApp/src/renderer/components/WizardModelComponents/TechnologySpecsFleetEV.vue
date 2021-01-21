<template>
  <div>
    <h3>Technology Specs: Fleet Electric Vehicle (EV)</h3>
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
          v-model="lostLoadCost"
          v-bind:field="metadata.lostLoadCost"
          :isInvalid="submitted && $v.lostLoadCost.$error"
          :errorMessage="getErrorMsg('lostLoadCost')">
        </text-input>

        <text-input
          v-model="maximumLoadCtrl"
          v-bind:field="metadata.maximumLoadCtrl"
          :isInvalid="submitted && $v.maximumLoadCtrl.$error"
          :errorMessage="getErrorMsg('maximumLoadCtrl')">
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
          :continue-link="`${TECH_SPECS_FLEET_EV_BASELINE_PATH}/${this.id}`"
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
  import TechnologySpecsFleetEVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsFleetEV';
  import { TECH_SPECS_FLEET_EV_BASELINE_PATH } from '@/router/constants';

  const metadata = TechnologySpecsFleetEVMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    name: 'TechnologySpecsFleetEV',
    mixins: [wizardFormMixin],
    props: ['id'],
    data() {
      const values = this.getFleetEVFromStore();
      const valuesMinusId = _.pickBy(values, (value, key) => key !== 'id');
      return {
        metadata,
        ...valuesMinusId,
        TECH_SPECS_FLEET_EV_BASELINE_PATH,
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
      isnew() {
        return this.complete === null;
      },
      getFleetEVFromStore() {
        return this.$store.getters.getFleetEVById(this.id);
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
        const fleetEVSpec = this.buildFleetEV();
        if (this.isnew()) {
          this.$store.dispatch('addTechnologySpecsFleetEV', fleetEVSpec);
        } else {
          const payload = {
            newFleetEV: fleetEVSpec,
            id: this.id,
          };
          this.$store.dispatch('replaceTechnologySpecsFleetEV', payload);
        }
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      buildFleetEV() {
        return {
          active: this.active,
          capitalCost: this.capitalCost,
          complete: this.complete,
          constructionYear: this.constructionYear,
          decomissioningCost: this.decomissioningCost,
          errorList: this.errorList,
          expectedLifetime: this.expectedLifetime,
          fixedOMCosts: this.fixedOMCosts,
          id: this.id,
          isReplaceable: this.isReplaceable,
          lostLoadCost: this.lostLoadCost,
          macrsTerm: this.macrsTerm,
          maximumLoadCtrl: this.maximumLoadCtrl,
          name: this.name,
          operationYear: this.operationYear,
          path: this.path,
          replacementCost: this.replacementCost,
          replacementConstructionTime: this.replacementConstructionTime,
          salvageValue: this.salvageValue,
          salvageValueOption: this.salvageValueOption,
          submitted: this.submitted,
          tag: this.tag,
          technologyType: this.technologyType,
          ter: this.ter,
        };
      },
    },
  };
</script>
