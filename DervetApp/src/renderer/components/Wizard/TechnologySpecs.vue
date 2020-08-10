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
                <router-link to="/wizard/technology-specs-battery-storage" class="btn btn-primary btn-w250">
                  Battery Storage
                </router-link>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <router-link to="/wizard/technology-specs-ice" class="btn btn-primary btn-w250">
                  Internal Combustion Engine
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="form-group form-buffer">
            <div class="col-md-12">
              <a class="btn btn-default" href="/Wizard/StartProject">&lt;&lt; Back</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  };
</script>
