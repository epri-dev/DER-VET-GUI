<template>
  <div class="form-group form-buffer row">
    <div class="col-md-3">
      <router-link :to="this.backLink" class="btn btn-primary">
        &lt;&lt; Back
      </router-link>
    </div>
    <div class="col-md-9">
      <router-link v-on:click.native="save" :to="this.continueLink" class="btn btn-primary pull-right">
        Save and Continue
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      backLink: String,
      continueLink: String,
      save: Function,
    },
  };
</script>
