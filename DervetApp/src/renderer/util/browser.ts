import { shell } from 'electron'; // eslint-disable-line

const openWebsiteInBrowser = (e: any, link: string) => {
  e.preventDefault();
  shell.openExternal(link);
};

export default openWebsiteInBrowser;
