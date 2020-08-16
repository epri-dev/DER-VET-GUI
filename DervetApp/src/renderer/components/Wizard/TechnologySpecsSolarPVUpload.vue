<template>
  <div>
    <h3>Technology Specs: Solar PV</h3>
    <hr>
    <form>
      <div class="form-horizontal form-buffer">
        <div class="form-group row">
          <div class="col-md-12">
            Upload the PV solar generation profile as a <code>.csv</code> file that contains the <i>per rated capacity</i> reading at each time interval on a separate line. The number of total lines expected depends on the selected year and timestep selected below. For instance, an upload with a timestep of 30-minutes for a year with 365 days would require an input file with 17,520 readings, whereas an upload with a timestep of 60-minutes on a year with 366 days would require an input file with 8,784 readings.
          </div>
        </div>
        <br>
        <div class="form-group row">
          <div class="col-md-12">
            <i>
              <a href="files/SamplePVgen-8760.csv" download class="important-link">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep for a year with 365 days (8,760 readings)
            </i>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12">
            <i>
              <a href="files/SamplePVgen-8784.csv" download class="important-link">Click here to download a sample <code>.csv</code> file</a> with a 60-minute timestep <b>for a leap year with 366 days</b> (8,784 readings)
            </i>
          </div>
        </div>
        <br>
        <div class="form-group row">
          <div class="col-md-5">
            <label class="control-label" for="generationProfileFile">
              Generation Profile File for {{dataYear}}
              <span class="unit-label">(kW / rated kW)</span>
            </label>
          </div>
          <div class="col-md-7">
            <input type="file" name="generationProfileFile" id="generationProfileFile" required="" class="form-control">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-5">
            <label class="control-label">Timestep</label>
          </div>
          <div class="col-md-7">
            <select
              class="form-control numberbox"
              id="timestep"
              name="timestep"
              v-model="inputGenerationProfileTimestep">
              <option
                v-for="value in validation.generationProfileTimestep.allowedValues"
                v-bind:value="value">
                {{value}}
              </option>
          </select>
          <span class="unit-label">minutes</span>
        </div>
        </div>
        <hr>

        <nav-buttons
          :back-link="`/wizard/technology-specs-solar-pv/${this.solarId}`"
          continue-link="/wizard/technology-specs"
          :save="this.save"
        />

      </div>
    </form>
  </div>
</template>

<script>
  import '../../assets/samples/SamplePVgen-8760.csv';
  import '../../assets/samples/SamplePVgen-8784.csv';
  import model from '../../models/TechnologySpecsSolarPV';
  import NavButtons from './NavButtons';

  const { defaults, validation } = model;

  export default {
    components: { NavButtons },
    props: ['solarId'],
    data() {
      return {
        validation,
        inputGenerationProfileTimestep: defaults.generationProfileTimestep,
        inputGenerationProfile: 'x', // TODO Load generation profile from file
        dataYear: 2020, // TODO replace with dataYear from project
      };
    },
    methods: {
      save() {
        // TODO move solar tech lookup to a function in a common place (getter in store)
        const techSpecsPV = this.$store.state.Project.technologySpecsSolarPV;
        const solarPVSpecs = techSpecsPV.find(x => x.id === this.solarId);
        solarPVSpecs.generationProfileTimestep = this.inputGenerationProfileTimestep;
        const payload = {
          newSolar: solarPVSpecs,
          solarId: this.solarId,
        };
        this.$store.dispatch('replaceTechnologySpecsSolarPV', payload);
      },
    },
  };
</script>
