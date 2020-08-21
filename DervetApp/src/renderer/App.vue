<template>
  <div id="app">
    <!-- TODO replace with vue-fontawesome plugin -->
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
    <b-navbar fixed="top" type="dark" variant="dark">
      <b-navbar-brand>DER-VET</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'dervetapp',
  };
</script>
