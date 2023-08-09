// /** @type {import('next').NextConfig} */
// // const nextConfig = {}

// // module.exports = nextConfig

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.node = {
            fs: 'empty',
        };
        return config;
    },
};
