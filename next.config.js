module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /bootstrap\.min\.css$/,
        use: ['style-loader', 'css-loader'],
      });
   
      return config;
    },
   };
   