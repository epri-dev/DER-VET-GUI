<template>
  <div class="form-group form-buffer row">
    <div class="col-md-3 back-btn">
      <router-link :to="computedBackLink" class="btn btn-primary">
        {{backText}}
      </router-link>
    </div>

    <div v-if="displayError" class="col-md-6 error-text-color">
      Please correct errors before continuing
    </div>
    <div v-else class="col-md-6">
    </div>

    <div class="col-md-3 continue-btn">
      <router-link
        v-on:click.native="save"
        :event="disabled ? '' : 'click'"
        :to="computedContinueLink"
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
    computed: {
      routeLL() {
        return this.$store.state.Project.routeObjectivesFinancialsLL;
      },
      computedContinueLink() {
        if (this.continueLink !== null) {
          return this.continueLink;
        }
        let nextPath = 'wizard/summary';
        for (let headLL = this.routeLL; headLL !== null; headLL = headLL.next) {
          if (headLL.path.localeCompare(this.currPath) === 0 && headLL.next !== null) {
            nextPath = headLL.next.path;
          }
        }
        return nextPath;
      },
      computedBackLink() {
        if (this.backLink !== null) {
          return this.backLink;
        }
        let prevLL = null;
        let prevPath = 'wizard/objectives';
        for (let headLL = this.routeLL; headLL !== null; headLL = headLL.next) {
          if (headLL.path.localeCompare(this.currPath) === 0) {
            prevPath = prevLL.path;
          }
          prevLL = headLL;
        }
        return prevPath;
      },
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
