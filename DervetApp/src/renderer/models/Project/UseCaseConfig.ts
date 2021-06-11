import map from 'lodash/map';
import { getExtraResourcesPath, readJsonFromFileSync } from '@/util/file';

const CASES_DIRECTORY = 'cases';
const CASES_CONFIG_FILE = 'cases.json';

export interface UseCaseConfigInterface {
  getDisplayText(): string;
  getFullDirectory(): string;
}

export class UseCaseConfig implements UseCaseConfigInterface {
  constructor(private displayText: string, private directory: string) {} // eslint-disable-line

  getFullDirectory(): string {
    return getExtraResourcesPath('', [CASES_DIRECTORY, this.directory]);
  }

  getDisplayText(): string { return this.displayText; }
}

const readCasesConfigFile = () => {
  const useCaseFile = getExtraResourcesPath(CASES_CONFIG_FILE, [CASES_DIRECTORY]);
  return readJsonFromFileSync(useCaseFile);
};

export const USE_CASE_CONFIGS: UseCaseConfig[] = (
  map(readCasesConfigFile(), (obj) => new UseCaseConfig(obj.displayText, obj.directory))
);
