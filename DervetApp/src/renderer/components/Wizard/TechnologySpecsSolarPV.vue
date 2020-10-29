<template>
  <div>
    <h3>Technology Specs: Solar PV</h3>
    <form>
      <div class="form-horizontal form-buffer container">

        <!-- String/Text box Example -->
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
              v-if="submitted && $v.inputName.$error"
              class="invalid-feedback">
              {{ getErrorMsg('name') }}
            </div>
            <p class="tool-tip tooltip-col">{{ getDescription('name') }}</p>
          </div>
        </div>

        <!-- numberbox Example -->
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="cost">{{ getDisplayName('cost') }}</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid numberbox"
              :class="{'is-invalid': submitted && $v.inputCost.$error}"
              id="cost"
              v-model.number="inputCost">
            </input>
            <span class="unit-label">{{ getDisplayUnit('cost') }}</span>
            <div
              v-if="submitted && $v.inputCost.$error"
              class="invalid-feedback">
              {{ getErrorMsg('cost') }}
            </div>
            <p class="tool-tip tooltip-col">{{ getDescription('cost') }}</p>
          </div>
        </div>

        <!-- Boolean (radio button) Example -->
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="size">{{ getDisplayName('shouldSize') }}</label>
          </div>
          <div class="col-md-9">
            <input
              type="radio"
              id="size-yes"
              v-model="inputShouldSize"
              v-bind:value="true">
            <label for="size-yes" class="buffer-right">{{ getLabelTrue('shouldSize') }}</label>
            <input
              type="radio"
              id="size-no"
              v-model="inputShouldSize"
              v-bind:value="false">
            <label for="size-no">{{ getLabelFalse('shouldSize') }}</label>
            <p class="tool-tip tooltip-col">{{ getDescription('shouldSize') }}</p>
          </div>
        </div>

        <!-- Conditional numberbox Example -->
        <div v-if="!inputShouldSize" class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="rated-capacity">{{ getDisplayName('ratedCapacity') }}</label>
          </div>
          <div class="col-md-3">
            <input
              class="form-control valid numberbox"
              :class="{'is-invalid': submitted && $v.inputRatedCapacity.$error}"
              id="rated-capacity"
              v-model.number="inputRatedCapacity">
            <span class="unit-label">{{ getDisplayUnit('ratedCapacity') }}</span>
            <div
              v-if="submitted && $v.inputRatedCapacity.$error"
              class="invalid-feedback">
              {{ getErrorMsg('ratedCapacity') }}
            </div>
            <p class="tool-tip tooltip-col">{{ getDescription('ratedCapacity') }}</p>
          </div>
        </div>

        <!-- Box with a List of Allowed Values Example -->
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="loc">{{ getDisplayName('loc') }}</label>
          </div>
          <div class="col-md-9">
            <select
              class="form-control valid numberbox"
              :class="{'is-invalid': submitted && $v.inputLoc.$error}"
              id="loc"
              v-model="inputLoc">
              <option value="">-</option>
              <option v-for="value in validation.loc.allowedValues" v-bind:value="value">
                {{value}}
              </option>
            </select>
            <span class="unit-label">{{ getDisplayUnit('loc') }}</span>
            <div
              v-if="submitted && $v.inputLoc.$error"
              class="invalid-feedback">
              {{ getErrorMsg('loc') }}
            </div>
            <p class="tool-tip tooltip-col">{{ getDescription('loc') }}</p>
          </div>
        </div>

        <!-- numberbox-lg Example -->
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="inverter-max">{{ getDisplayName('inverterMax') }}</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid numberbox-lg"
              :class="{'is-invalid': submitted && $v.inputInverterMax.$error}"
              id="cost"
              v-model.number="inputInverterMax">
            </input>
            <span class="unit-label">{{ getDisplayUnit('inverterMax') }}</span>
            <div
              v-if="submitted && $v.inputInverterMax.$error"
              class="invalid-feedback">
              {{ getErrorMsg('inverterMax') }}
            </div>
            <p class="tool-tip tooltip-col">{{ getDescription('inverterMax') }}</p>
          </div>
        </div>

        <!-- Date box Example -->
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="construction-date">{{ getDisplayName('constructionDate') }}</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              :class="{'is-invalid': submitted && $v.inputConstructionDate.$error}"
              type="date"
              id="construction-date"
              v-model="inputConstructionDate">
            </input>
            <span class="unit-label">{{ getDisplayUnit('constructionDate') }}</span>
            <div
              v-if="submitted && $v.inputConstructionDate.$error"
              class="invalid-feedback">
              {{ getErrorMsg('constructionDate') }}
            </div>
            <p class="tool-tip tooltip-col">{{ getDescription('constructionDate') }}</p>
          </div>
        </div>

        <!-- Date box Example -->
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="operation-date">{{ getDisplayName('operationDate') }}</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              :class="{'is-invalid': submitted && $v.inputOperationDate.$error}"
              type="date"
              id="operation-date"
              v-model="inputOperationDate">
            </input>
            <span class="unit-label">{{ getDisplayUnit('operationDate') }}</span>
            <div
              v-if="submitted && $v.inputOperationDate.$error"
              class="invalid-feedback">
              {{ getErrorMsg('operationDate') }}
            </div>
            <p class="tool-tip tooltip-col">{{ getDescription('operationDate') }}</p>
          </div>
        </div>

        <!-- Box with a List of Allowed Values Example -->
        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="macrs-term">{{ getDisplayName('macrsTerm') }}</label>
          </div>
          <div class="col-md-9">
            <select
              class="form-control valid numberbox"
              :class="{'is-invalid': submitted && $v.inputMacrsTerm.$error}"
              id="macrs-term"
              v-model="inputMacrsTerm">
              <option value="">--</option>
              <option v-for="value in validation.macrsTerm.allowedValues" v-bind:value="value">
                {{value}}
              </option>
            </select>
            <span class="unit-label">{{ getDisplayUnit('macrsTerm') }}</span>
            <div
              v-if="submitted && $v.inputMacrsTerm.$error"
              class="invalid-feedback">
              {{ getErrorMsg('macrsTerm') }}
            </div>
            <p class="tool-tip tooltip-col">{{ getDescription('macrsTerm') }}</p>
          </div>
        </div>

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

  import model from '@/models/TechnologySpecs/TechnologySpecsSolarPV';
  import NavButtons from '@/components/Shared/NavButtons';

  const { validation, schemaValidations } = model;

  export default {
    components: { NavButtons },
    props: ['solarId'],
    data() {
      const data = {
        validation,
        schemaValidations,
        submitted: false,
      };
      if (this.solarId === 'null') {
        return { ...data, ...this.getDefaultData() };
      }
      return { ...data, ...this.getDataFromProject() };
    },

    validations: schemaValidations,

    methods: {
      // TODO: move these methods to a shared place for import
      getErrorMsg(fieldName) {
        // this method returns a single validation error message (String)
        // input argument is the name of a single input varible  (String)
        const displayName = this.getDisplayName(fieldName);
        const varName = `input${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;
        let displayMsg = displayName;
        if (!this.$v[varName].required) {
          displayMsg += ' is required';
          return displayMsg;
        }
        if (this.schemaValidations[varName].decimal && !this.$v[varName].decimal) {
          displayMsg += ' must be a number';
          return displayMsg;
        }
        if (this.schemaValidations[varName].minValue && !this.$v[varName].minValue) {
          displayMsg += ` must be >= ${this.validation[fieldName].min}`;
          return displayMsg;
        }
        if (this.schemaValidations[varName].maxValue && !this.$v[varName].maxValue) {
          displayMsg += ` must be <= ${this.validation[fieldName].max}`;
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
      getDisplayName(param) {
        return validation[param].displayName;
      },
      getDisplayUnit(param) {
        return validation[param].unit;
      },
      getDefaultVal(param) {
        return validation[param].defaultVal;
      },
      getDescription(param) {
        return validation[param].description;
      },
      getLabelTrue(param) {
        return validation[param].labelTrue;
      },
      getLabelFalse(param) {
        return validation[param].labelFalse;
      },

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
