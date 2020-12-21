<template>
  <div class="form-group form-buffer row">
    <div class="col-md-3 back-btn">
      <button @click="save" class="btn btn-primary">Save</button>
    </div>

    <div v-if="displayError" class="col-md-5 error-text-color">
      There are errors on the page.
    </div>
    <div v-else class="col-md-5">
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
