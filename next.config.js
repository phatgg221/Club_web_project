const path = require('path');

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },

  webpack: (config) => {
    

    // Add an alias for '@'
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
  },
  // output: 'export'     // comment this line to run localhost
};
