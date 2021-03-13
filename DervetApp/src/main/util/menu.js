const { app, shell } = require('electron'); // eslint-disable-line

const makeHelpItem = (label, link) => ({
  label,
  click: async () => {
    await shell.openExternal(link);
  },
});

const menuConfig = [
  { role: 'appMenu' },
  { role: 'fileMenu' },
  { role: 'editMenu' },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  { role: 'windowMenu' },
  {
    role: 'help',
    submenu: [
      makeHelpItem('Documentation', 'https://storagewikidev.epri.com/index.php/DER_VET_User_Guide#Index'),
      makeHelpItem('Community Discussions', 'https://www.der-vet.com/forum/'),
      makeHelpItem('Feedback', 'https://www.surveymonkey.com/r/dervetfeedback'),
    ],
  },
];

export default menuConfig;
