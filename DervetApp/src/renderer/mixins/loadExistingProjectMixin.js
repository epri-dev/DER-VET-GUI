import { SUMMARY } from '@/router/constants';
import { importProject } from '@/service/ProjectFileManager';
import * as a from '@/store/actionTypes';

export default {
  methods: {
    loadExistingProject(importDirectory) {
      return this.$store.dispatch(a.RESET_ALL)
        .then(() => importProject(importDirectory))
        .then((dto) => this.$store.dispatch('loadNewProjectAndApplication', dto))
        .then(() => this.$router.push({ path: SUMMARY }));
    },
  },
};
