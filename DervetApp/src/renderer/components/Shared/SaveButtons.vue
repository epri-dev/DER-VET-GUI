<template>
  <div class="form-group form-buffer row">
    <div class="col-md-3 back-btn">
      <button @click="save" type="button" class="btn btn-primary">Save</button>
    </div>

    <div v-if="displayError" class="col-md-5 error-text-color">
      {{ errorText }}
    </div>
    <div v-else class="col-md-5">
    </div>

    <div class="col-md-4 continue-btn">
      <router-link
        v-on:click.native="save"
        :event="disabled ? '' : 'click'"
        :to="continueLink"
        class="btn btn-primary pull-right">
        {{continueText}}
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currPath: this.$route.path,
      };
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
    },
    props: {
      backLink: {
        type: String,
        default: null,
      },
      backText: {
        type: String,
        default: '<< Back',
      },
      continueLink: {
        type: String,
        default: null,
      },
      continueText: {
        type: String,
        default: 'Save and Continue >>',
      },
      errorText: {
        type: String,
        default: 'There are errors on the page.',
      },
      save: {
        type: Function,
        default: () => null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      displayError: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
