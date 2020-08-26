<template>
  <div class="form-group form-buffer row">
    <div class="col-md-6 back-btn">
      <router-link :to="this.backLink" class="btn btn-primary">
        {{this.backText}}
      </router-link>
    </div>
    <div class="col-md-6 continue-btn">
      <router-link v-on:click.native="save" :to="this.continueLink" class="btn btn-primary pull-right">
        {{this.continueText}}
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      backLink: String,
      backText: {
        type: String,
        default: '<< Back',
      },
      continueLink: String,
      continueText: {
        type: String,
        default: 'Save and Continue >>',
      },
      save: Function,
    },
  };
</script>
