// import _ from 'lodash';
import * as paths from '@/router/constants';

const OBJECTIVES_PAGEKEY = 'objectives';

// allow for up to 4 sets of TS data on a single page (user-defined services)
const objectivesMixin = {
  computed: {
    objectives() {
      const p = this.$store.state.Project;
      return [
        {
          show: true,
          fullName: 'Site Information',
          pageName: 'siteInformation',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_SITE_INFORMATION_PATH,
        },
        {
          show: p.includeSystemLoad,
          fullName: 'System Information',
          pageName: 'systemInformation',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_SYSTEM_INFORMATION_PATH,
        },
        {
          show: p.objectivesDeferral,
          fullName: 'Deferral',
          pageName: 'deferral',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_DEFERRAL_PATH,
        },
        {
          show: p.objectivesFR,
          fullName: 'Frequency Regulation',
          pageName: 'FR', // todo make pageName the camelcase of fullName
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_FR_PATH,
        },
        {
          show: p.objectivesLF,
          fullName: 'Load Following',
          pageName: 'LF',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_LF_PATH,
        },
        {
          show: p.objectivesNSR,
          fullName: 'Non-Spinning Reserves',
          pageName: 'NSR',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_NSR_PATH,
        },
        {
          show: p.objectivesSR,
          fullName: 'Spinning Reserves',
          pageName: 'SR',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_SR_PATH,
        },
        {
          show: p.objectivesResilience,
          fullName: 'Reliability',
          pageName: 'resilience',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_RESILIENCE_PATH,
        },
        {
          show: p.objectivesDR,
          fullName: 'Demand Response',
          pageName: 'DR',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_DR_PATH,
        },
        {
          show: p.objectivesRA,
          fullName: 'Resourse Adequacy',
          pageName: 'RA',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_RA_PATH,
        },
        {
          show: p.objectivesBackupPower,
          fullName: 'Backup Energy',
          pageName: 'backup',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_BACKUP_POWER_PATH,
        },
        {
          show: p.objectivesUserDefined,
          fullName: 'Custom Service',
          pageName: 'userDefined',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_RESILIENCE_PATH,
        },
        {
          show: p.objectivesDA,
          fullName: 'Day Ahead Pricing',
          pageName: 'DA',
          pageKey: OBJECTIVES_PAGEKEY,
          path: paths.OBJECTIVES_DA_PATH,
        },
      ];
    },
  },
  methods: {
    isComplete(pageKey, page) {
      return !this.$store.state.Application.pageCompleteness.components[pageKey][page];
    },
  },
};

export default objectivesMixin;
