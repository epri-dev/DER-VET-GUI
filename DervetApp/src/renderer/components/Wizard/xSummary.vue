<template>
  <div>
    <h3>Summary</h3>
    <hr />
    <form>
      <div class="form-horizontal form-buffer container">

        <h4>Setup</h4>
        <table class="table table-bordered">
          <tr>
            <td><label>Project Name</label></td>
            <td>zappa</td>
          </tr>
          <tr>
            <td><label>Start Year</label></td>
            <td>2020</td>
          </tr>
          <tr>
            <td><label>Analysis Horizon</label></td>
            <td>20 <span class="unit-label">years</span></td>
          </tr>
        </table>
        </br>

        <h4>Technology Specifications</h4>


      <nav-buttons
        back-link="/wizard/sensitivity-analysis"
        continue-link="/wizard/run-analysis"
        continue-text="Run Analysis"
        :save="this.save"
      />

      </div>
    </form>

  </div>
</template>

<script>
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
  };
</script>
