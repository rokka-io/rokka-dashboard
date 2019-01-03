const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      { loader: 'cache-loader' },
      {
        loader: 'thread-loader',
        options: {
          // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          workers: require('os').cpus().length - 1
        }
      },
      {
        loader: 'ts-loader',
        options: {
          happyPackMode: true
        }
      },
      'react-docgen-typescript-loader'
    ]
  });
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: path.resolve(__dirname, '../../../../tslint.json'),
      tsconfig: path.resolve(__dirname, '../../tsconfig.json')
    })
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
