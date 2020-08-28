<template>
  <div class="form-group form-buffer row">
    <div class="col-md-6 back-btn">
      <button class="btn btn-primary" @click="goBack">
        {{backText}}
      </button> 
      <!-- </router-link :to="getPrevPagePath" class="btn btn-primary">
        {{backText}}
      </router-link> -->
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
        let headLL = this.routeLL;
        while (headLL.path !== this.currPath) {
          // check next link
          headLL = headLL.next;
        }
        // page link found -- check for next
        if (headLL === null) {
          return 'wizard/summary'; // direct to the summary page
        }
        return headLL.next.path;
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
      save: Function,
    },
  };
</script>
