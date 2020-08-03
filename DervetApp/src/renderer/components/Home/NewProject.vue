<template>
  <div id="wrapper">
    <div class="form-horizontal form-buffer">
<!--        @if (!ViewData.ModelState.IsValid)
        {
            <div class="form-group">
                @Html.BootstrapAlert(Html.ValidationSummary(false))
            </div>
        } -->
        <div class="form-group">
            <label for="project">Name of the project:</label>
            <input type="text" class="form-control" id="project">

        </div>
        <div class="form-group">

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
