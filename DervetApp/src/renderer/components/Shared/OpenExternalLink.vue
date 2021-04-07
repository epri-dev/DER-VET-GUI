<template>
  <a class="text-decoration-none"
     @click="e => openWebsiteInBrowser(e)"
     href=''>
    {{ text }}
  </a>
</template>

<script lang="ts">
  import openWebsiteInBrowser from '@/util/browser';

  export default {
    props: ['link', 'text'],
    methods: {
      openWebsiteInBrowser(e: any) {
        openWebsiteInBrowser(e, this.link);
      },
    },
  };
</script>
