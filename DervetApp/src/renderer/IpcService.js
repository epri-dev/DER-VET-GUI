import { ipcRenderer } from 'electron'; // eslint-disable-line
import store from './store';

export default class IpcService {
  static registerChannels() {
    ipcRenderer.on('dervet-results', (event, results) => {
      console.log('Received DERVET results');
      console.log(`Pro forma: ${results.proForma}`);
      console.log(`Cost benefit: ${results.costBenefit}`);
      store.dispatch('receiveResults', results);
    });
  }

  static sendProject(project) {
    ipcRenderer.send('dervet-inputs', project);
  }
}
