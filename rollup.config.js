import { normalize } from 'path';
import commonjs from '@rollup/plugin-commonjs';

export default args => {
  const result = args.configDefaultConfig;
  const [jsConfig, mJsConfig] = result;
  [jsConfig, mJsConfig].forEach(config => {
    // copy from mx
    /* config.plugins[10] = commonjs({
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
      transformMixedEsModules: true,
      requireReturnsDefault: "auto",
      // ignore: id => (config.external || []).some(value => new RegExp(value).test(id))
    }); */

    const onwarn = config.onwarn;
    config.onwarn = warning => {
      const ignoredWarnings = [
        {
          ignoredCode: 'CIRCULAR_DEPENDENCY',
          ignoredPath: 'node_modules/@projectstorm/geometry/dist/Polygon.js',
        },
        {
          ignoredCode: 'CIRCULAR_DEPENDENCY',
          ignoredPath: 'node_modules/@projectstorm/react-diagrams-routing/dist/link/PathFindingLinkFactory.js',
        },
        {
          ignoredCode: 'CIRCULAR_DEPENDENCY',
          ignoredPath: 'node_modules/@projectstorm/react-diagrams-routing/dist/link/RightAngleLinkFactory.js',
        },
      ]

      // only show warning when code and path don't match
      // anything in above list of ignored warnings
      if (!ignoredWarnings.some(({ ignoredCode, ignoredPath }) => (
        warning.code === ignoredCode &&
        normalize(warning.importer).includes(normalize(ignoredPath))))
      ) {
        onwarn(warning);
      }
    };
  });

  return result;
};
