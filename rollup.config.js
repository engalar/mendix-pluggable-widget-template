export default args => {
  const result = args.configDefaultConfig;
  const [jsConfig, mJsConfig] = result;

  [jsConfig, mJsConfig].forEach(config => {
    const onwarn = config.onwarn;
    config.onwarn = warning => {
      if (
        warning.loc &&
        warning.loc.file &&
        warning.loc.file.includes("node_modules")
      ) {
        return;
      }
      if ([
        'NAMESPACE_CONFLICT',
        'CIRCULAR_DEPENDENCY',
        'EVAL'
      ].includes(warning.code)) return;

      onwarn(warning);
    };
  });

  return result;
};
