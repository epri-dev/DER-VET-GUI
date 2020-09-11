<template>
  <div class="container body-content">
    <h3>Status</h3>
    <hr />
    <div class="form-horizontal form-buffer">
      <div class="form-group">
        <div class="col-md-12 text-center">
          <img src="../../assets/copper-loader.gif" />
          <br />
          <label>Running Analysis for {{projectName}} </label>
          <br />
          <p>
              Please be patient... this can take several minutes to complete...
          </p>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>


<script>
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    computed: {
      projectName() {
        return this.$store.state.Project.name;
      },
    },
  };
</script>

