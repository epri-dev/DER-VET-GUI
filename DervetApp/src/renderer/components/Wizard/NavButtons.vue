<template>
  <div class="form-group form-buffer row">
    <div class="col-md-6 back-btn">
      <router-link :to="prevPagePath" class="btn btn-primary">
        {{backText}}
      </router-link>
    </div>
    <!-- <h1>{{this.$route.path}}</h1> -->
    <div class="col-md-6 continue-btn">
      <router-link v-on:click.native="save" :to="nextPagePath" class="btn btn-primary pull-right">
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
      nextPagePath() {
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
      prevPagePath() {
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
    },
  };
</script>
