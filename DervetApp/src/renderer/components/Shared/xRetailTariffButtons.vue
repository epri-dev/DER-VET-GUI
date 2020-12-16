<template>
  <div class="form-group form-buffer row">
    <div class="col-md-3 back-btn">
      <router-link
        v-on:click.native="save"
        :event="disabled ? '' : 'click'"
        :to="saveLink"
        class="btn btn-primary pull-left">
        {{ saveText }}
      </router-link>
    </div>

    <div v-if="displayError" class="col-md-5 error-text-color">
      There are errors on the page.
    </div>
    <div v-else class="col-md-5">
    </div>

    <div class="col-md-4 continue-btn">
      <router-link
        v-on:click.native="save"
        :event="disabled ? '' : 'click'"
        :to="continueLink"
        class="btn btn-primary pull-right">
        {{ continueText }}
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
      continueLink: {
        type: String,
        default: null,
      },
      continueText: {
        type: String,
        default: 'Save and Continue >>',
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
      saveLink: {
        type: String,
        default: null,
      },
      saveText: {
        type: String,
        default: 'Save',
      },
    },
  };
</script>
