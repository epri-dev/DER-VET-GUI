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
          :back-link="WIZARD_COMPONENT_PATH"
          :continue-link="`${TECH_SPECS_PV_PATH}-upload/${this.solarId}`"
          :disabled=$v.$invalid
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
    methods: {
      isNewSolar() {
        return this.solarId === 'null';
      },
      getSolarFromStore() {
        return this.$store.getters.getSolarPVById(this.solarId);
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
          tag: this.tag,
          technologyType: this.technologyType,
          id: this.id,
          name: this.name,
          cost: this.cost,
          shouldSize: this.shouldSize,
          ratedCapacity: this.ratedCapacity,
          loc: this.loc,
          inverterMax: this.inverterMax,
          constructionDate: this.constructionDate,
          operationDate: this.operationDate,
          macrsTerm: this.macrsTerm,
          generationProfile: this.generationProfile,
        };
      },
    },
  };
</script>
