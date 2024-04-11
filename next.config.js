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
  // output: 'export', // Add this line to enable static HTML export
};
