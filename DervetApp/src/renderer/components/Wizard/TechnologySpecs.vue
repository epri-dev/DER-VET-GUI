<template>
  <div>
    <h3>Technology Specs</h3>
    <hr>
      <div class="form-horizontal form-buffer">
        <div class="row">
          <div class="col-md-5">
            <div class="form-group">
              <div class="col-md-12">
                <label>Select a technology to add:</label>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <router-link to="/wizard/technology-specs-solar-pv/null" class="btn btn-primary btn-w250">
                  Solar PV
               </router-link>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <router-link to="/wizard/technology-specs-battery/null" class="btn btn-primary btn-w250">
                  Battery Storage
                </router-link>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <router-link to="/wizard/technology-specs-ice/null" class="btn btn-primary btn-w250">
                  Internal Combustion Engine
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <nav-buttons
          back-link="/wizard/start-project"
          continue-link="/wizard/objectives"
          continue-text="Done Adding Technologies >>"
          :save="this.save"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import NavButtons from './NavButtons';

  export default {
    components: { NavButtons },
    methods: {
      save() {
      },
    },
  };
</script>
