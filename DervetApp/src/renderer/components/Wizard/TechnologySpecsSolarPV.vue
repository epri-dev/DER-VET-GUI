<template>
  <div>
    <h3>Technology Specs: Solar PV</h3>
    <form>
      <div class="form-horizontal form-buffer container">

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="name">Name</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              id="name"
              type="text"
              v-model="inputName">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="cost">Cost per kW</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox valid"
              id="cost"
              type="text"
              v-model.number="inputCost">
              <span class="unit-label">$/kW</span>
              <br/>
              <p class="tool-tip tooltip-col">Capital cost per kW of rated power capacity (applied in year 0 of the analysis)</p>
          </div>
        </div>

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
              type="text"
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
              type="text"
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

        <nav-buttons
          back-link="/wizard/technology-specs"
          :continue-link="`/wizard/technology-specs-solar-pv-upload/${this.inputId}`"
          :save="this.save"
        />

      </div>
    </form>

  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';

  import model from '@/models/TechnologySpecsSolarPV';
  import NavButtons from '@/components/Shared/NavButtons';

  const { defaults, validation } = model;

  export default {
    components: { NavButtons },
    props: ['solarId'],
    data() {
      const data = { validation };
      if (this.solarId === 'null') {
        return { ...data, ...this.getDefaultData() };
      }
      return { ...data, ...this.getDataFromProject() };
    },
    methods: {
      getDefaultData() {
        return {
          inputActive: defaults.active,
          inputTag: defaults.tag,
          inputTechnologyType: defaults.technologyType,
          inputId: uuidv4(),
          inputName: defaults.name,
          inputCost: defaults.cost,
          inputShouldSize: defaults.shouldSize,
          inputRatedCapacity: defaults.ratedCapacity,
          inputLoc: defaults.loc,
          inputInverterMax: defaults.inverterMax,
          inputConstructionDate: defaults.constructionDate,
          inputOperationDate: defaults.operationDate,
          inputMacrsTerm: defaults.macrsTerm,
          inputGenerationProfile: defaults.generationProfile,
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
      save() {
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
