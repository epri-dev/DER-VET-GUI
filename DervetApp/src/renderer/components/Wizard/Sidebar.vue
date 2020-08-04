<template>
  <div class="left-sidebar">
    <b-nav vertical>
        <router-link class="nav nav-sidebar" to="/wizard/start-project">
          Project Configuration
        </router-link>
        <router-link class="nav nav-sidebar" to="/wizard/technology-specs">
          Technology Specifications
        </router-link>
        <router-link class="nav nav-sidebar" to="/wizard/objectives">
          Services
        </router-link>
        <router-link class="nav nav-sidebar indented" to="/wizard/objectives-parameters-site-information">
          Site Information
        </router-link>
        <router-link class="nav nav-sidebar" to="/wizard/financial-inputs">
          Financial Inputs
        </router-link>
        <router-link class="nav nav-sidebar indented" to="/wizard/financial-inputs-external-incentives">
          External Incentives
        </router-link>
        <router-link class="nav nav-sidebar" to="/wizard/sensitivity-analysis">
          Scenario Analysis
        </router-link>
        <li class="nav nav-sidebar">
          <div class="menutext">Summary</div>
        </li>
        <li class="nav nav-sidebar">
          <div class="menutext">Results</div>
        </li>  
    </b-nav>
    <div class="export-project">
      <router-link class="btn btn-md btn-primary" to="/">Export Project</router-link>
    </div>
  </div>
</template>


<script>
  export default {};
</script>
