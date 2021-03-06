import { ipcRenderer } from 'electron'; // eslint-disable-line

import store from '@/store';
import * as a from '@/store/actionTypes';

const DERVET_ERROR = 'dervet-error';
const DERVET_INPUTS = 'dervet-inputs';
const DERVET_RESULTS = 'dervet-results';

export default class IpcService {
  static registerChannels() {
    ipcRenderer.on(DERVET_RESULTS, (event, results) => {
      store.dispatch(`Results/${[a.RECEIVE_RESULTS]}`, results);
    });

    ipcRenderer.on(DERVET_ERROR, (event, error) => {
      store.dispatch('Application/receiveError', error);
    });
  }

  static sendProject(project) {
    ipcRenderer.send(DERVET_INPUTS, project);
  }

  static stopPython() {
    ipcRenderer.send('kill-dervet');
  }
}
