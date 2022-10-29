const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  const tsRule = options.module.rules.find(i => i.test.test('1.ts'));
  const use = {
    loader: "swc-loader",
    options: {
      // jsc: {
      //   parser: {
      //     syntax: "typescript"
      //   }
      // }
    }
  };
  if (tsRule) {
    tsRule.use = use
  } else {
    options.module.rules.push({
      test: /\.ts$/,
      exclude: /(node_modules)/,
      use,
    })
  }
  options.plugins = [options.plugins[0]]
  options.output.clean = true;
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100', '@fastify/*', 'pg-native'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: true }),
    ],
  };
};
