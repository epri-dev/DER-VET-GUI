<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="container body-content form-buffer">
          <br/>
          <h3>Import Existing Project</h3>
          <hr />

          <p>
            Import an existing project by clicking the "Select Project" button below and selecting the folder from your computer that contains the
            project you wish to import. Note that this folder must include the DER-VET <code>{{PROJECT_FILE}}</code> and <code>{{APPLICATION_FILE}}</code> files.
          </p>

          <div class="form-horizontal form-buffer">
            <div class="row">
              <file-picker
                label="Select Project"
                :callback="setImportDirectory"
                buttonAttributes="btn btn-primary btn-lg"
                wrapperDivAttributes="text-center col-md-12"
                :isDirectory="true"
                :isAsync="false"
              />
            </div>

            <br/>

            <div
              v-if="this.importDirectoryExists()"
              class="row center import-card">
              <div class="col-md-1"/>

              <div class="box-shadow shadow shadow-sm col-md-10 row align-items-center import-card">
                <div class="col-md-10">
                  {{this.importDirectory}}
                </div>
                <div class="col-md-2">
                  <div v-if="this.isImporting" class="btn btn-primary">
                    <div
                      class="spinner-border text-light"
                      role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  <div
                    class="btn btn-primary"
                    v-else
                    @click="importProject()">
                    Import
                  </div>
                </div>
              </div>

              <div class="col-md-1"/>

            </div>

            <br/>

            <div class="row">
              <div
                class="col-md-12 error-text-color text-center"
                v-if="this.importError !== null">
                {{this.importError}}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FilePicker from '@/components/Shared/FilePicker.vue';
  import loadExistingProjectMixin from '@/mixins/loadExistingProjectMixin';
  import { APPLICATION_FILE, PROJECT_FILE } from '@/service/ProjectFileManager';

  export default {
    components: {
      FilePicker,
    },
    mixins: [loadExistingProjectMixin],
    data() {
      return {
        APPLICATION_FILE,
        PROJECT_FILE,
        importDirectory: null,
        importError: null,
        isImporting: false,
      };
    },
    methods: {
      importDirectoryExists() {
        return this.importDirectory !== null;
      },
      setImportDirectory(path) {
        this.importDirectory = path;
      },
      setImportError(err) {
        this.importError = err;
      },
      importProject() {
        this.isImporting = true;
        return this.loadExistingProject(this.importDirectory)
          .catch(this.setImportError)
          .finally(() => { this.isImporting = false; });
      },
    },
  };
</script>
