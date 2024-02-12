module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: {
                and: [/\.(js|ts)x?$/]
            },
            use: ['@svgr/webpack']
        });
        return config;
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'images.prismic.io',
            port: '',
          },
        ],
      },
};
