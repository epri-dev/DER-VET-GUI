<template>
  <a class="text-decoration-none"
     @click="e => openWebsiteInBrowser(e)"
     href=''>
    {{ text }}
  </a>
</template>

<script lang="ts">
  import { shell } from 'electron'; // eslint-disable-line

  export default {
    props: ['link', 'text'],
    methods: {
      openWebsiteInBrowser(e: any) {
        e.preventDefault();
        shell.openExternal(this.link);
      },
    },
  };
</script>
