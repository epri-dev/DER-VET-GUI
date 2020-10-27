<template>
  <div>
    <h3>Technology Specs: Solar PV</h3>
    <form>
      <div class="form-horizontal form-buffer container">

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="name">{{ getDisplayName('name') }}</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              :class="{'is-invalid': submitted && $v.inputName.$error}"
              id="name"
              v-model.trim="inputName">
            </input>
            <span class="unit-label">{{ getDisplayUnit('name') }}</span>
            <div
              v-if="submitted && $v.inputName.$params.required && !$v.inputName.required"
              class="invalid-feedback">
              '{{ getDisplayName('name') }}' is required.
            </div>
            <div
              v-if="submitted && $v.inputName.$params.decimal && !$v.inputName.decimal"
              class="invalid-feedback">
              '{{ getDisplayName('name') }}' must be a number
            </div>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="cost">{{ getDisplayName('cost') }}</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox valid"
              :class="{'is-invalid': submitted && $v.inputCost.$error}"
              id="cost"
              v-model.number="inputCost">
            </input>
            <span class="unit-label">{{ getDisplayUnit('cost') }}</span>
            <div
              v-if="submitted && !$v.inputCost.required"
              class="invalid-feedback">
              '{{ getDisplayName('cost') }}' is required.
            </div>
            <div
              v-if="submitted && !$v.inputCost.minValue"
              class="invalid-feedback">
              '{{ getDisplayName('cost') }}' must be greater than or equal to 0
            </div>
            <div
              v-if="submitted && !$v.inputCost.decimal"
              class="invalid-feedback">
              '{{ getDisplayName('cost') }}' must be a number
            </div>
            <br/>
            <p class="tool-tip tooltip-col">Capital cost per kW of rated power capacity (applied in year 0 of the analysis)</p>
          </div>
        </div>
<!--
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="size">Sizing</label>
          </div>
          <div class="col-md-9">
            <input
              id="size-yes"
              type="radio"
              v-model="inputShouldSize"
              v-bind:value="true">
            <label for="size-yes" class="buffer-right">Have DER-VET size the Solar PV</label>
            <input
              id="size-no"
              type="radio"
              v-model="inputShouldSize"
              v-bind:value="false">
            <label for="size-no">Known size</label>
          </div>
        </div>

        <div v-if="!inputShouldSize" class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="rated-capacity">Rated Capacity</label>
          </div>
          <div class="col-md-3">
            <input
              class="form-control numberbox valid"
              id="rated-capacity"
              v-model.number="inputRatedCapacity">
            <span class="unit-label">kW</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="loc">Coupled System Type</label>
          </div>
          <div class="col-md-9">
            <select
              class="form-control valid"
              id="loc"
              v-model="inputLoc">
              <option value="">-</option>
              <option v-for="value in validation.loc.allowedValues" v-bind:value="value">
                {{value}}
              </option>
            </select>
            <p class="tool-tip tooltip-col">Solar plus storage AC or DC coupled system</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="inverter-max">Solar (+storage) Inverter Rating (kVA)</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox-lg"
              id="inverter-max"
              v-model.number="inputInverterMax">
            <span class="unit-label">kW</span>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="construction-date">Construction Date</label>
          </div>
          <div class="col-md-9">
            <input
              type="date"
              class="form-control valid"
              id="construction-date"
              v-model="inputConstructionDate">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="operation-date">Operation Date</label>
          </div>
          <div class="col-md-9">
            <input
              type="date"
              class="form-control valid"
              id="operation-date"
              v-model="inputOperationDate">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="macrs-term">MACRS Term</label>
          </div>
          <div class="col-md-9">
            <select
            class="form-control numberbox"
            id="macrs-term"
            v-model.number="inputMacrsTerm">
              <option v-bind:value="undefined">-</option>
              <option v-for="value in validation.macrsTerm.allowedValues" v-bind:value="value">
                {{value}}
              </option>
            </select>
            <span class="unit-label">years</span>
            <br/>
            <p class="tool-tip tooltip-col">Which MACRS GDS category does solar PV fall into?</p>
          </div>
        </div>
-->
        <nav-buttons
          back-link="/wizard/technology-specs"
          :continue-link="`/wizard/technology-specs-solar-pv-upload/${this.inputId}`"
          :save="validatedSave"
          :disabled=$v.$invalid
        />

      </div>
    </form>

  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';
  import { required, minValue, decimal } from 'vuelidate/lib/validators';

  import model from '@/models/TechnologySpecsSolarPV';
  import NavButtons from '@/components/Shared/NavButtons';

  // const { validation, schemaValidations } = model;
  const { validation } = model;

  export default {
    components: { NavButtons },
    props: ['solarId'],
    data() {
      const data = {
        validation,
        // schemaValidations,
        submitted: false,
      };
      if (this.solarId === 'null') {
        return { ...data, ...this.getDefaultData() };
      }
      return { ...data, ...this.getDataFromProject() };
    },
    computed: {
    },

    // TODO: automate the creation of validations object, from validation
    /*
    validations: {
      // inputName: { required },
      inputName: this.getValidations('xname'),
      inputCost: { required, decimal, minValue: minValue(0) },
    },
    validations: schemaValidations,
    */
    validations: {
      inputCost: { required, decimal, minValue: minValue(0) },
      inputName: { required },
    },

    methods: {

      // TODO: move these to a shared place for import
      validatedSave() {
        this.submitted = true;
        this.$v.$touch();
        if (!this.$v.$invalid) {
          return this.saveAndContinue();
        }
        return () => {};
        // return alert('invalid save. please correct errors.');
      },
      getDisplayName(param) {
        return validation[param].displayName;
      },
      getDisplayUnit(param) {
        return validation[param].unit;
      },
      /*
      getValidations(param) {
        if (param === 'name') {
          return { required };
        }
        return {};
      },
      */
      // ------------

      getDefaultData() {
        return {
          inputActive: validation.active.defaultVal,
          inputTag: validation.tag.defaultVal,
          inputTechnologyType: validation.technologyType.defaultVal,
          inputId: uuidv4(),
          inputName: validation.name.defaultVal,
          inputCost: validation.cost.defaultVal,
          inputShouldSize: validation.shouldSize.defaultVal,
          inputRatedCapacity: validation.ratedCapacity.defaultVal,
          inputLoc: validation.loc.defaultVal,
          inputInverterMax: validation.inverterMax.defaultVal,
          inputConstructionDate: validation.constructionDate.defaultVal,
          inputOperationDate: validation.operationDate.defaultVal,
          inputMacrsTerm: validation.macrsTerm.defaultVal,
          inputGenerationProfile: validation.generationProfile.defaultVal,
        };
      },
      getDataFromProject() {
        const solarPVSpecs = this.$store.getters.getSolarPVById(this.solarId);
        return {
          inputActive: solarPVSpecs.active,
          inputTag: solarPVSpecs.tag,
          inputTechnologyType: solarPVSpecs.technologyType,
          inputId: solarPVSpecs.id,
          inputName: solarPVSpecs.name,
          inputCost: solarPVSpecs.cost,
          inputShouldSize: solarPVSpecs.shouldSize,
          inputRatedCapacity: solarPVSpecs.ratedCapacity,
          inputLoc: solarPVSpecs.loc,
          inputInverterMax: solarPVSpecs.inverterMax,
          inputConstructionDate: solarPVSpecs.constructionDate,
          inputOperationDate: solarPVSpecs.operationDate,
          inputMacrsTerm: solarPVSpecs.macrsTerm,
          inputGenerationProfile: solarPVSpecs.generationProfile,
        };
      },
      saveAndContinue() {
        if (this.solarId === 'null') {
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
          active: this.inputActive,
          tag: this.inputTag,
          technologyType: this.inputTechnologyType,
          id: this.inputId,
          name: this.inputName,
          cost: this.inputCost,
          shouldSize: this.inputShouldSize,
          ratedCapacity: this.inputRatedCapacity,
          loc: this.inputLoc,
          inverterMax: this.inputInverterMax,
          constructionDate: this.inputConstructionDate,
          operationDate: this.inputOperationDate,
          macrsTerm: this.inputMacrsTerm,
          generationProfile: this.inputGenerationProfile,
        };
      },
    },
  };
</script>
