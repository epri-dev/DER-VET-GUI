<template>
  <div>
    <h3>Technology Specs: Solar PV</h3>
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
          v-model="cost"
          v-bind:field="metadata.cost"
          :isInvalid="submitted && $v.cost.$error"
          :errorMessage="getErrorMsg('cost')">
        </text-input>

        <radio-button-input
          v-model="shouldSize"
          v-bind:field="metadata.shouldSize"
          :isInvalid="submitted && $v.shouldSize.$error"
          :errorMessage="getErrorMsg('shouldSize')">
        </radio-button-input>

        <div v-if="shouldSize === false">
          <text-input
            v-model="ratedCapacity"
            v-bind:field="metadata.ratedCapacity"
            :isInvalid="submitted && $v.ratedCapacity.$error"
            :errorMessage="getErrorMsg('ratedCapacity')">
          </text-input>
        </div>

        <drop-down-input
          v-model="loc"
          v-bind:field="metadata.loc"
          :isInvalid="submitted && $v.loc.$error"
          :errorMessage="getErrorMsg('loc')">
        </drop-down-input>

        <text-input
          v-model="inverterMax"
          v-bind:field="metadata.inverterMax"
          :isInvalid="submitted && $v.inverterMax.$error"
          :isLargeBox="true"
          :errorMessage="getErrorMsg('inverterMax')">
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

        <drop-down-input
          v-model="macrsTerm"
          v-bind:field="metadata.macrsTerm"
          :isInvalid="submitted && $v.macrsTerm.$error"
          :errorMessage="getErrorMsg('macrsTerm')">
        </drop-down-input>

        <save-buttons
          :continue-link="`${TECH_SPECS_PV_PATH}-upload/${this.solarId}`"
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
  import TechnologySpecsSolarPVMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';
  import { WIZARD_COMPONENT_PATH, TECH_SPECS_PV_PATH } from '@/router/constants';

  const metadata = TechnologySpecsSolarPVMetadata.getHardcodedMetadata();
  const validations = metadata.toValidationSchema();

  export default {
    name: 'TechnologySpecsSolarPV',
    // TODO maybe rename this to just 'id'
    mixins: [wizardFormMixin],
    props: ['solarId'],
    data() {
      const values = this.isNewSolar() ? metadata.getDefaultValues() : this.getSolarFromStore();
      return {
        metadata,
        ...values,
        WIZARD_COMPONENT_PATH,
        TECH_SPECS_PV_PATH,
      };
    },
    validations: {
      ...validations,
      ratedCapacity: {
        ...validations.ratedCapacity,
        required: requiredIf(function isRatedCapacityRequired() {
          return this.shouldSize === false;
        }),
      },
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
      isNewSolar() {
        return this.solarId === 'null';
      },
      getSolarFromStore() {
        return this.$store.getters.getSolarPVById(this.solarId);
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
        if (this.shouldSize === true) {
          this.resetNonRequired(['ratedCapacity']);
        }
        this.submitted = true;
        this.$v.$touch();
        // set complete to true or false
        this.complete = !this.$v.$invalid;
        // populate errorList for this technology
        if (this.complete !== true) {
          this.errorList = this.makeErrorList();
        }
        const solarSpec = this.buildSolarPV();
        if (this.isNewSolar()) {
          this.$store.dispatch('addTechnologySpecsSolarPV', solarSpec);
        } else {
          const payload = {
            newSolar: solarSpec,
            solarId: this.solarId,
          };
          this.$store.dispatch('replaceTechnologySpecsSolarPV', payload);
        }
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      buildSolarPV() {
        return {
          active: this.active,
          complete: this.complete,
          constructionYear: this.constructionYear,
          cost: this.cost,
          errorList: this.errorList,
          generationProfile: this.generationProfile,
          id: this.id,
          inverterMax: this.inverterMax,
          loc: this.loc,
          macrsTerm: this.macrsTerm,
          name: this.name,
          operationYear: this.operationYear,
          ratedCapacity: this.ratedCapacity,
          shouldSize: this.shouldSize,
          tag: this.tag,
          technologyType: this.technologyType,
        };
      },
    },
  };
</script>
