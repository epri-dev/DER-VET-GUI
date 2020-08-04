<template>
    <div class="container body-content">
        <h3>Create a New Project</h3>
        <hr />
        <div class="form-horizontal form-buffer">
            <div class="form-group">
                <div class="col-md-3 text-right">
                    <label class="control-label" for="ProjectName">Project Name</label>
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="ProjectName">
                </div>
                <div class="col-md-5">
                    <p type="tool-tip">Name of the project.</p>
                </div>
            </div>
            <div class="form-group">
                <!-- <div class="col-md-3 text-right">
                    <label class="control-label" for="ProjectType">Project Type</label>
                </div> -->
                <div class="col-md-4">
                    <b-dropdown id="ProjectType" text="Project Type">
                        <b-dropdown-item>Exert</b-dropdown-item>
                        <b-dropdown-item>Wizard</b-dropdown-item>
                    </b-dropdown>
                </div>
                <div class="col-md-5">
                    <p class="tool-tip">Wizard projects guide you through constructing an analysis by asking a series of questions. Expert Mode projects allow you to directly edit the project configuration data used by DER-VET. Please note that this decision is final &mdash; once you select a Project Type you cannot change it.</p>
                </div>
            </div>
            <hr />
            <div class="form-group form-buffer">
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary pull-right">Save and Continue</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'newProject',
  };
</script>

<!-- <style scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  
  .form-horizontal .control-label {
    text-align: left;
    padding-top: 3px;
    padding-right: 0;
}
</style>
 -->
