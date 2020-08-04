<template>
  <div class="container-fluid">
    <div class="row">
      <sidebar></sidebar>
      <div class="col-md-12 main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar';

  export default {
    components: {
      Sidebar,
    },
  };
</script>
