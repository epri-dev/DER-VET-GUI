const { app, shell } = require('electron'); // eslint-disable-line

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV === 'development';

const makeHelpItem = (label, link) => ({
  label,
  click: async () => {
    await shell.openExternal(link);
  },
});

const appMenu = () => ({
  label: app.name,
  submenu: [
    { role: 'about' },
    ...(isMac ? [
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ] : []),
  ],
});

const viewMenu = () => ({
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
    ...(isDev ? [
      { role: 'toggleDevTools' },
    ] : []),
  ],
});

const windowMenu = () => ({
  label: 'Window',
  submenu: [
    { role: 'minimize' },
    { role: 'close' },
  ],
});

const menuConfig = [
  appMenu(),
  { role: 'fileMenu' },
  { role: 'editMenu' },
  viewMenu(),
  windowMenu(),
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
