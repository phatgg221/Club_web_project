const path = require('path');

module.exports = {
 images: {
    domains: ['res.cloudinary.com'],
 },

 webpack: (config) => {
    // Add your custom rule for handling Bootstrap CSS
    config.module.rules.push({
      test: /bootstrap\.min\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Merge your custom alias with the existing ones
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
 },
 
//  output: 'export'     // comment this line to run localhost
};
