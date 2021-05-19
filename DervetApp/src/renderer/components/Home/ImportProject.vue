<template>
  <div class="container body-content form-buffer">
    <h2>Import Existing Project</h2>
    <hr />

    <p>
      Import an existing project by clicking the "Select Project" button below and selecting the folder from your computer that contains the
      project you wish to import. Note that this folder must include the DER-VET <code>{{PROJECT_FILE}}</code> and <code>{{APPLICATION_FILE}}</code> files.
    </p>

    <div class="form-horizontal form-buffer">
      <file-picker
        label="Select Project"
        :callback="setImportDirectory"
        buttonAttributes="btn btn-primary"
        wrapperDivAttributes="col-md-2"
        :isDirectory="true"
        :isAsync="false"
      />
      <div class=col-md-10>
        {{this.importDirectory}}
      </div>
      <br/>

      <div class="col-md-offset-2 col-md-10">
        <div v-if="this.isImporting" class="btn btn-primary">
          <div
            class="spinner-border text-light"
            role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <router-link v-else
                     :to="$route.path"
                     class="btn btn-primary"
                     v-on:click.native="importProject()">
          Import
        </router-link>
      </div>
      <br/>
      <div
        class="col-md-12 error-text-color"
        v-if="this.importError !== null">
        {{this.importError}}
      </div>
    </div>
  </div>
</template>

<script>
  import FilePicker from '@/components/Shared/FilePicker.vue';
  import { SUMMARY } from '@/router/constants';
  import { APPLICATION_FILE, PROJECT_FILE, importProject } from '@/service/ProjectFileManager';
  import store from '@/store';
  import { APPLICATION } from '@/store/modules/Application';
  import { LOAD_NEW_PROJECT } from '@/store/actionTypes';
  import { PROJECT } from '@/models/Project/constants';

  export default {
    components: {
      FilePicker,
    },
    data() {
      return {
        APPLICATION_FILE,
        PROJECT_FILE,
        applicationState: null,
        importDirectory: null,
        importError: null,
        isImporting: false,
      };
    },
    methods: {
      setImportDirectory(path) {
        this.importDirectory = path;
      },
      importProject() { // eslint-disable-line
        // TODO create class w/ application object + project
        let project;
        this.isImporting = true;
        if (this.importDirectory !== null) {
          return importProject(this.importDirectory)
            .then((parsed) => {
              project = parsed.find(item => item.storeType === PROJECT);
              this.applicationState = parsed.find(item => item.storeType === APPLICATION);
              store.dispatch(LOAD_NEW_PROJECT, project);
            })
            .then(() => store.dispatch('Application/setNewApplicationState', this.applicationState))
            .then(() => this.$router.push({ path: SUMMARY }))
            .catch((err) => { this.importError = err; })
            .finally(() => { this.isImporting = false; });
        }
        this.importError = 'Please select your project folder before clicking "Import".';
        return new Promise((resolve) => { resolve(); }).finally(() => { this.isImporting = false; });
      },
    },
  };
</script>
