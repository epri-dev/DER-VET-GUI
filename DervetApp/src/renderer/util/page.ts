import _ from 'lodash';

const somePageHasError = (pages: any[]) => (
  _.some(pages, page => (!page.complete && page.active))
);

export default somePageHasError;
