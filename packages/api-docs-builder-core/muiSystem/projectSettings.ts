import path from 'path';
import { LANGUAGES } from 'docs/config';
import { ProjectSettings } from '@mui-internal/api-docs-builder';
import findApiPages from '@mui-internal/api-docs-builder/utils/findApiPages';
import { getSystemComponentInfo } from './getSystemComponentInfo';

export const projectSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/system/pagesApi.js'),
  },
  typeScriptProjects: [
    {
      name: 'system',
      rootPath: path.join(process.cwd(), 'packages/mui-system'),
      entryPointPath: 'src/index.d.ts',
    },
  ],
  getApiPages: () => findApiPages('docs/pages/system/api'),
  getComponentInfo: getSystemComponentInfo,
  languages: LANGUAGES,
  skipComponent(filename) {
    return filename.match(/(ThemeProvider|CssVarsProvider|GlobalStyles)/) !== null;
  },
};
