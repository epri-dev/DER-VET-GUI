const { app, shell } = require('electron'); // eslint-disable-line

const makeHelpItem = (label, link) => ({
  label,
  click: async () => {
    await shell.openExternal(link);
  },
});

const makeViewSubMenu = () => {
  const menu = [
    { role: 'reload' },
    { role: 'forceReload' },
    { type: 'separator' },
    { role: 'resetZoom' },
    { role: 'zoomIn' },
    { role: 'zoomOut' },
    { type: 'separator' },
    { role: 'togglefullscreen' },
  ];

  if (process.env.NODE_ENV === 'development') {
    menu.push({ role: 'toggleDevTools' });
  }

  return menu;
};

const menuConfig = [
  { role: 'appMenu' },
  { role: 'fileMenu' },
  { role: 'editMenu' },
  {
    label: 'View',
    submenu: makeViewSubMenu(),
  },
  { role: 'windowMenu' },
  {
    role: 'help',
    submenu: [
      makeHelpItem('Documentation', 'https://storagewiki.epri.com/index.php/DER_VET_User_Guide#Index'),
      makeHelpItem('Community Discussions', 'https://www.der-vet.com/forum/'),
      makeHelpItem('Feedback', 'https://www.surveymonkey.com/r/dervetfeedback'),
    ],
  },
];

export default menuConfig;
