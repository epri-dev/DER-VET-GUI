<template>
  <div class="container">
    <h3>Error</h3>
    <hr />
    <div class="form-horizontal form-buffer">
      <div class="form-group text-center">
        <label class="text-danger">Your session has expired.</label>
      </div>
      <hr />
      <div class="form-group form-buffer">
        <div class="col-md-12">
          <router-link to="/new-project" v-on:click.native="resetProjectToDefault()" class="btn btn-primary pull-right">Start Over</router-link>
        </div>
      </div>
    </div>
  </div>
</template>



