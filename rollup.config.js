import { normalize } from 'path';
import { getBabelInputPlugin } from "@rollup/plugin-babel";

function replacePlugin(config, name, plugin) {
  if (typeof name == 'string') {

  }

  if (typeof name == 'number') {
    config.plugins[name] = plugin;
  }

}

export default args => {
  const production = Boolean(args.configProduction);
  const result = args.configDefaultConfig;
  const [jsConfig, mJsConfig] = result;
  [jsConfig, mJsConfig].forEach(config => {
    //https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#manual-babel-setup
    const newBabelPlugin = getBabelInputPlugin({
      sourceMaps: !production,
      babelrc: false,
      babelHelpers: "bundled",
      plugins: ["@babel/plugin-proposal-class-properties"],
      overrides: [
        {
          test: /node_modules/,
          plugins: ["@babel/plugin-transform-flow-strip-types", "@babel/plugin-transform-react-jsx"]
        },
        {
          exclude: /node_modules/,
          "plugins": [
            ["@babel/plugin-transform-react-jsx", {
              "runtime": "automatic"
            }]
          ]
        }
      ]
    });

    replacePlugin(config, 9, newBabelPlugin);

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
