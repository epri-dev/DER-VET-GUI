import { SUMMARY } from '@/router/constants';
import { importProject, checkSchemaVersion } from '@/service/ProjectFileManager';
import * as a from '@/store/actionTypes';
import { generateApplicationStateFromProject } from '@/util/application';

export default {
  methods: {
    loadExistingProject(importDirectory) {
      return this.$store.dispatch(a.RESET_ALL)
        .then(() => importProject(importDirectory))
        .then(project => checkSchemaVersion(project))
        .then(project => this.$store.dispatch('loadNewProject', project))
        .then(project => generateApplicationStateFromProject(project))
        .then(application => this.$store.dispatch(`Application/${a.SET_NEW_APPLICATION_STATE}`, application))
        .then(() => this.$router.push({ path: SUMMARY }));
    },
  },
};
