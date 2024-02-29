/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
//  output: 'export',
 images: {
    loader: 'custom',
    loaderFile: './my-loader.ts', // Ensure this file exists and exports a loader function
 },
 webpack: (config) => {
    // Add a rule to handle CSS files from Bootstrap
    config.module.rules.push({
      test: /bootstrap\.min\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Add an alias for '@' to simplify imports
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
 },
};
