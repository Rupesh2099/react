/* eslint-disable no-console */
/**
 * Given the dist tag fetch the corresponding
 * version and make sure this version is used throughout the repository.
 *
 * If you work on this file:
 * WARNING: This script can only use built-in modules since it has to run before
 * `yarn install`
 */
const childProcess = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

// packages published from the react monorepo using the same version
const reactPackageNames = ['react', 'react-dom', 'react-is', 'react-test-renderer', 'scheduler'];
const devDependenciesPackageNames = ['@mnajdova/enzyme-adapter-react-18', '@testing-library/react'];

// if we need to support more versions we will need to add new mapping here
const additionalVersionsMappings = {
  17: {
    '@mnajdova/enzyme-adapter-react-18': 'npm:@eps1lon/enzyme-adapter-react-17',
    '@testing-library/react': '^12.1.0',
  },
};

async function main(version) {
  if (typeof version !== 'string') {
    throw new TypeError(`expected version: string but got '${version}'`);
  }

  if (version === 'stable') {
    console.log('Nothing to do with stable');
    return;
  }

  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));

  const { stdout: v } = await exec(`npm view --json react@${version} version`);
  const majorVersion = v.replace('"', '').split('.')[0];
  console.log(majorVersion);

  await Promise.all(
    reactPackageNames.map(async (reactPackageName) => {
      const { stdout: versions } = await exec(`npm dist-tag ls ${reactPackageName} ${version}`);
      const tagMapping = versions.split('\n').find((mapping) => {
        return mapping.startsWith(`${version}: `);
      });

      let packageVersion = null;

      if (tagMapping === undefined) {
        // Some specific version is being requested
        if (majorVersion) {
          packageVersion = version;
          if (reactPackageName === 'scheduler') {
            // get the scheduler version from the react-dom's dependencies entry
            const { stdout: reactDOMDependenciesString } = await exec(
              `npm view --json react-dom@${version} dependencies`,
            );
            packageVersion = JSON.parse(reactDOMDependenciesString)['scheduler'];
          }
        } else {
          throw new Error(`Could not find '${version}' in "${versions}"`);
        }
      } else {
        packageVersion = tagMapping.replace(`${version}: `, '');
      }

      packageJson.resolutions[reactPackageName] = packageVersion;
    }),
  );

  // At this moment all dist tags reference React 18 version, so we don't need
  // to update these dependencies unless an older version is used, or when the
  // next/experimental dist tag reference to a future version of React
  // packageJson.devDependencies['@mnajdova/enzyme-adapter-react-18'] =
  //   'npm:@mnajdova/enzyme-adapter-react-next';
  // packageJson.devDependencies['@testing-library/react'] = 'alpha';

  if (additionalVersionsMappings[majorVersion]) {
    devDependenciesPackageNames.forEach((packageName) => {
      if (!additionalVersionsMappings[majorVersion][packageName]) {
        throw new Error(
          `Version ${majorVersion} does not have version defined for the ${packageName}`,
        );
      }
      packageJson.devDependencies[packageName] =
        additionalVersionsMappings[majorVersion][packageName];
    });
  }

  // add newline for clean diff
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}${os.EOL}`);
}

const [version = process.env.REACT_VERSION] = process.argv.slice(2);
main(version).catch((error) => {
  console.error(error);
  process.exit(1);
});
