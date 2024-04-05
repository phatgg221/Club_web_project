const path = require('path');

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true, // Disable Image Optimization
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  output: 'export',
};
