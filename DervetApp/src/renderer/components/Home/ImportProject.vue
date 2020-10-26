<template>
  <div>
    <h2>Import Existing Project</h2>
    <hr />
    <p>
        Import an existing project by clicking the "Choose File" button below and selecting the ZIP file from your computer that contains the
        exported project you wish to import. Note that this file must be a ZIP file that includes the DER-VET metadata file (a <code>.json</code> or <code>.csv</code> file)
        and any associated time series files (solar performance time series files, site load time series files, etc.).
    </p>
    <div class="form-horizontal form-buffer">
      <div class="form-group">
        <label for="ProjectDataFile" class="control-label col-md-4">Project Data ZIP File</label>
        <div class="col-md-10">
          <input type="file" name="ProjectDataFile" id="ProjectDataFile" required class="form-control" />
        </div>
      </div>
      <div class="form-group form-buffer">
        <div class="col-md-offset-2 col-md-10">
          <input type="submit" value="Import Project" class="btn btn-primary" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'importProject',
  };
</script>
