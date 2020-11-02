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
          v-bind:field="metadata.shouldSize">
        </radio-button-input>

        <div v-if="!shouldSize">
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

        <!-- Date box Example -->
        <text-input
          v-model="constructionDate"
          v-bind:field="metadata.constructionDate"
          :isInvalid="submitted && $v.constructionDate.$error"
          :isLargeBox="true"
          :errorMessage="getErrorMsg('constructionDate')">
        </text-input>

        <text-input
          v-model="operationDate"
          v-bind:field="metadata.operationDate"
          :isInvalid="submitted && $v.operationDate.$error"
          :isLargeBox="true"
          :errorMessage="getErrorMsg('operationDate')">
        </text-input>

        <!-- Box with a List of Allowed Values Example -->
        <drop-down-input
          v-model="macrsTerm"
          v-bind:field="metadata.macrsTerm"
          :isInvalid="submitted && $v.macrsTerm.$error"
          :errorMessage="getErrorMsg('macrsTerm')">
        </drop-down-input>

        <nav-buttons
          back-link="/wizard/technology-specs"
          :continue-link="`/wizard/technology-specs-solar-pv-upload/${this.metadata.id}`"
          :save="validatedSave"
          :disabled=$v.$invalid
        />

      </div>
    </form>

  </div>
</template>

<script>
<<<<<<< HEAD
  import { v4 as uuidv4 } from 'uuid';

  import DropDownInput from '@/components/Shared/DropDownInput';
  import NavButtons from '@/components/Shared/NavButtons';
  import RadioButtonInput from '@/components/Shared/RadioButtonInput';
  import TextInput from '@/components/Shared/TextInput';
  import TechnologySpecsSolarPV from '@/models/Project/TechnologySpecsSolarPV';

  const vals = TechnologySpecsSolarPV.getHardcodedDefaults().toValidationSchema();

  export default {
    components: {
      DropDownInput,
      NavButtons,
      RadioButtonInput,
      TextInput,
    },
    // TODO maybe rename this to just 'id'
    props: ['solarId'],
    data() {
      let metadata;
      const isNewSpec = this.solarId === 'null';
      if (isNewSpec) {
        metadata = TechnologySpecsSolarPV.getHardcodedDefaults();
      } else {
        metadata = this.$store.getters.getSolarPVById(this.solarId);
      }
      /**
      Get rid of copy pasta with spread
      data = {
        metadata: TechnologySpecsSolarPV.getDefaults(),
        ... metadata.map(x => x.value)
      }
      */
      return {
        submitted: false,
        isNewSpec,
        metadata,
        name: metadata.name.value,
        cost: metadata.cost.value,
        shouldSize: metadata.shouldSize.value,
        ratedCapacity: metadata.ratedCapacity.value,
        loc: metadata.loc.value,
        inverterMax: metadata.inverterMax.value,
        constructionDate: metadata.constructionDate.value,
        operationDate: metadata.operationDate.value,
        macrsTerm: metadata.macrsTerm.value,
      };
    },
    validations: vals,
    methods: {
      // TODO: move these methods to a shared place for import
      getErrorMsg(fieldName) {
        // this method returns a single validation error message (String)
        // input argument is the name of a single input varible  (String)
        const { displayName } = this.metadata[fieldName];
        let displayMsg = displayName;


        if (!this.$v[fieldName].required) {
          displayMsg += ' is required';
          return displayMsg;
        }
        if (vals[fieldName].decimal && !this.$v[fieldName].decimal) {
          displayMsg += ' must be a number';
          return displayMsg;
        }
        if (vals[fieldName].minValue && !this.$v[fieldName].minValue) {
          displayMsg += ` must be >= ${this.metadata[fieldName].minValue}`;
          return displayMsg;
        }
        if (vals[fieldName].maxValue && !this.$v[fieldName].maxValue) {
          displayMsg += ` must be <= ${this.metadata[fieldName].maxValue}`;
          return displayMsg;
        }
        return '';
      },
      validatedSave() {
        this.submitted = true;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          return this.saveAndContinue();
        }
        return () => {};
        // TODO: report 'invalid save. please correct errors.'
        //   have it appear for 2 seconds on a disabled click, and then fade away
      },
      saveAndContinue() {
        if (this.isNewSpec) {
          this.$store.dispatch('addTechnologySpecsSolarPV', this.buildSolarPV());
        } else {
          const payload = {
            newSolar: this.buildSolarPV(),
            solarId: this.solarId,
          };
          this.$store.dispatch('replaceTechnologySpecsSolarPV', payload);
        }
        this.$store.dispatch('makeListOfActiveTechnologies', this.$store.state.Project);
      },
      buildSolarPV() {
        return {
          active: this.metadata.active,
          id: this.metadata.id,
          tag: this.metadata.tag,
          technologyType: this.metadata.technologyType,

          name: this.metadata.name.setValue(this.name),
          cost: this.metadata.cost.setValue(this.cost),
          shouldSize: this.metadata.shouldSize.setValue(this.shouldSize),
          ratedCapacity: this.metadata.ratedCapacity.setValue(this.ratedCapacity),
          loc: this.metadata.loc.setValue(this.loc),
          inverterMax: this.metadata.inverterMax.setValue(this.inverterMax),
          constructionDate: this.metadata.constructionDate.setValue(this.constructionDate),
          operationDate: this.metadata.operationDate.setValue(this.operationDate),
          macrsTerm: this.metadata.macrsTerm.setValue(this.macrsTerm),

          generationProfile: this.metadata.generationProfile,
        };
      },
    },
  };
</script>
