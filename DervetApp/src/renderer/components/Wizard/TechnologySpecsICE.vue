<template>
  <div>
    <h3>Technology Specs: Internal Combustion Engine</h3>
    <hr />
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
            <label class="control-label" for="rated-capacity">Rated Capacity</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="rated-capacity"
              type="text"
              v-model.number="inputRatedCapacity">
            <span class="unit-label">kW / generator</span>
            <p class="tool-tip tooltip-col">What is the rated capacity of the internal combustion engine?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="minimum-power">Minimum Power</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="minimum-power"
              type="text"
              v-model.number="inputMinimumPower">
            <span class="unit-label">kW</span>
            <p class="tool-tip tooltip-col">What is the mimimum power the internal combustion engine is capable of safely producing?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="startup-time">Startup time</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="startup-time"
              type="text"
              v-model.number="inputStartupTime">
            <span class="unit-label">minutes</span>
            <p class="tool-tip tooltip-col">How many minutes are required for the internal combustion engine to go from an off state to producing its full rated power?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="efficiency">Efficiency</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="efficiency"
              type="text"
              v-model.number="inputEfficiency">
            <span class="unit-label">gallons / kWh</span>
            <p class="tool-tip tooltip-col">How many gallons of fuel does it take to generate 1 kWh of electricity? No variable efficiency is considered at this stage.</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="fuel-cost">Fuel Cost</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="fuel-cost"
              type="text"
              v-model.number="inputFuelCost">
            <span class="unit-label">$ / gallon</span>
            <p class="tool-tip tooltip-col">What is the price of fuel (constant over analysis horizon)?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="capital-cost">Capital Cost</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="capital-cost"
              type="text"
              v-model.number="inputCapitalCost">
            <span class="unit-label">$ / generator</span>
            <p class="tool-tip tooltip-col">What is the capital cost of each internal combustion engine?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="variable-om-cost">Variable O&amp;M cost</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="variable-om-cost"
              type="text"
              v-model.number="inputVariableOMCost">
            <span class="unit-label">$ / MWh</span>
            <p class="tool-tip tooltip-col">What is the cost of variable operations and maintenance for each MWh of AC energy delivered?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="fixed-om-cost-including-exercise">Fixed O&amp;M Cost, including exercise</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox"
              id="fixed-om-cost-including-exercise"
              type="text"
              v-model.number="inputFixedOMCostIncludingExercise">
            <span class="unit-label">$ / kW-year</span>
            <p class="tool-tip tooltip-col">What is the cost of fixed operations and maintenance, including the non-fuel expenses from exercising the internal combustion engine?</p>
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="construction-date">Construction Date</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              id="construction-date"
              type="date"
              v-model="inputConstructionDate">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-3">
            <label class="control-label" for="operation-date">Operation Date</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control valid"
              id="operation-date"
              type="date"
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
            <p class="tool-tip tooltip-col">Which MACRS GDS category does internal combustion engine fall into?</p>
          </div>
        </div>
        <br/>

        <div class="form-group">
          <div class="col-md-6">
            <label class="control-label" for="size">Number of Internal Combustion Engines to Install:</label>
          </div>
        </div>

        <div class="col-md-11 offset-md-1">
          <input
            id="size-yes"
            name="size"
            type="radio"
            v-model="inputShouldSize"
            v-bind:value="true">
          <label for="size-yes" class="buffer-right">Have DER-VET determine the optimal number of Internal Combustion Engines to install</label>
        </div>
        <div class="col-md-11 offset-md-1">
          <input
            id="size-no"
            name="size"
            type="radio"
            v-model="inputShouldSize"
            v-bind:value="false">
          <label for="size-no" class="buffer-right">Known number of Internal Combustion Engines</label>
        </div>
        <br/>

        <div v-if="inputShouldSize">
          <div class="form-group row" style="; margin-left: 30px;">
            <div class="col-md-3">
              <label class="control-label" for="min-generators">Minimum Number of Generators to Install</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox valid"
                id="min-generators"
                type="text"
                v-model.number="inputMinGenerators">
              <span class="unit-label">generators</span>
              <p class="tool-tip tooltip-col">What is the mimimum number of internal combustion engines to consider installing?</p>
            </div>
          </div>
          <div class="form-group row" style="; margin-left: 30px;">
            <div class="col-md-3">
              <label class="control-label" for="max-generators">Maximum Number of Generators to Install</label>
            </div>
            <div class="col-md-9">
              <input
                class="form-control numberbox valid"
                id="max-generators"
                type="text"
                v-model.number="inputMaxGenerators">
              <span class="unit-label">generators</span>
              <p class="tool-tip tooltip-col">What is the maximum number of internal combustion engines to consider installing?</p>
            </div>
          </div>
        </div>

        <div v-if="!inputShouldSize" class="form-group row" style="; margin-left: 30px;">
          <div class="col-md-3">
            <label class="control-label" for="num-generators">Number of Generators to Install</label>
          </div>
          <div class="col-md-9">
            <input
              class="form-control numberbox valid"
              id="num-generators"
              type="text"
              v-model.number="inputNumGenerators">
            <span class="unit-label">generators</span>
            <p class="tool-tip tooltip-col">What is the number of internal combustion engines to install?</p>
          </div>
        </div>

        <nav-buttons
          back-link="/wizard/technology-specs"
          continue-link="/wizard/technology-specs"
          :save="this.save"
        />

      </div>
    </form>

  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';
  import NavButtons from './NavButtons';
  import model from '../../models/TechnologySpecsICE';

  const { defaults, validation } = model;

  export default {
    components: { NavButtons },
    props: ['iceId'],
    data() {
      const data = { validation };
      if (this.iceId === 'null') {
        return { ...data, ...this.getDefaultData() };
      }
      return { ...data, ...this.getDataFromProject() };
    },
    methods: {
      getDefaultData() {
        return {
          inputId: uuidv4(),
          inputName: defaults.name,
          inputRatedCapacity: defaults.ratedCapacity,
          inputMinimumPower: defaults.minimumPower,
          inputStartupTime: defaults.startupTime,
          inputEfficiency: defaults.efficiency,
          inputFuelCost: defaults.fuelCost,
          inputCapitalCost: defaults.capitalCost,
          inputVariableOMCost: defaults.variableOMCost,
          inputFixedOMCostIncludingExercise: defaults.fixedOMCostIncludingExercise,
          inputConstructionDate: defaults.constructionDate,
          inputOperationDate: defaults.operationDate,
          inputMacrsTerm: defaults.macrsTerm,
          inputShouldSize: defaults.shouldSize,
          inputNumGenerators: defaults.numGenerators,
          inputMinGenerators: defaults.minGenerators,
          inputMaxGenerators: defaults.maxGenerators,
        };
      },
      getDataFromProject() {
        const techSpecsICE = this.$store.state.Project.technologySpecsICE;
        const iceSpecs = techSpecsICE.find(x => x.id === this.iceId);
        return {
          inputId: iceSpecs.id,
          inputName: iceSpecs.name,
          inputRatedCapacity: iceSpecs.ratedCapacity,
          inputMinimumPower: iceSpecs.minimumPower,
          inputStartupTime: iceSpecs.startupTime,
          inputEfficiency: iceSpecs.efficiency,
          inputFuelCost: iceSpecs.fuelCost,
          inputCapitalCost: iceSpecs.capitalCost,
          inputVariableOMCost: iceSpecs.variableOMCost,
          inputFixedOMCostIncludingExercise: iceSpecs.fixedOMCostIncludingExercise,
          inputConstructionDate: iceSpecs.constructionDate,
          inputOperationDate: iceSpecs.operationDate,
          inputMacrsTerm: iceSpecs.macrsTerm,
          inputShouldSize: iceSpecs.shouldSize,
          inputNumGenerators: iceSpecs.numGenerators,
          inputMinGenerators: iceSpecs.minGenerators,
          inputMaxGenerators: iceSpecs.maxGenerators,
        };
      },
      save() {
        if (this.iceId === 'null') {
          this.$store.dispatch('addTechnologySpecsICE', this.buildICE());
        } else {
          const payload = {
            newICE: this.buildICE(),
            iceId: this.iceId,
          };
          this.$store.dispatch('replaceTechnologySpecsICE', payload);
        }
      },
      buildICE() {
        return {
          id: this.inputId,
          name: this.inputName,
          ratedCapacity: this.inputRatedCapacity,
          minimumPower: this.inputMinimumPower,
          startupTime: this.inputStartupTime,
          efficiency: this.inputEfficiency,
          fuelCost: this.inputFuelCost,
          capitalCost: this.inputCapitalCost,
          variableOMCost: this.inputVariableOMCost,
          fixedOMCostIncludingExercise: this.inputFixedOMCostIncludingExercise,
          constructionDate: this.inputConstructionDate,
          operationDate: this.inputOperationDate,
          macrsTerm: this.inputMacrsTerm,
          shouldSize: this.inputShouldSize,
          numGenerators: this.inputNumGenerators,
          minGenerators: this.inputMinGenerators,
          maxGenerators: this.inputMaxGenerators,
        };
      },
    },
  };
</script>
