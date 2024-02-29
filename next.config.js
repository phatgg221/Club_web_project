const path = require('path');

module.exports = {
 output: 'export',
 webpack: (config) => {
    config.module.rules.push({
      test: /bootstrap\.min\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Add an alias for '@'
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
 },
 images: {
    unoptimized: true,
 },
};
