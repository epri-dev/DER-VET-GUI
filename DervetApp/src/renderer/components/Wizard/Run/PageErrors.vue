<template>
  <div v-if="somePageHasError" class="incomplete">
    <h4>Errors in {{ pageGroupName }}</h4>
    <div v-for="page in pages">
      <div v-if="!page.complete">
        <li>
          <router-link class="text-decoration-none"
                       v-bind:class="{ incomplete: !page.complete }"
                       :to="page.path">
            {{ pageDisplayName(page.name, page.submitted) }}
          </router-link>
          <ul v-if="page.submitted">
            <li v-for="error in page.errors">
              <span v-html="error"></span>
            </li>
          </ul>
        </li>
      </div>
    </div>
    <br/>
  </div>
</template>

<script>
  import somePageHasError from '@/util/page';

  export default {
    props: {
      pages: Array,
      pageGroupName: String,
    },
    computed: {
      somePageHasError() {
        return somePageHasError(this.pages);
      },
    },
    methods: {
      pageDisplayName(name, submitted) {
        return submitted ? name : `${name}: Not Started`;
      },
    },
  };
</script>