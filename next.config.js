module.exports = {
  images: {
    domains: ['www.datocms-assets.com'],
  },
  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //     config.node = {
  //       fs: 'empty'
  //     }
  //   }

  //   return config
  // },
  // next.config.js

  async rewrites() {
        return [
          {
            // source: '/api/:path*',
            source: 'https://ba-footblog.vercel.app',
            destination: 'https://ba-footblog-1gc7tvq76-bahobab.vercel.app/api/datocmsquery',
          },
        ]
      },

  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       // destination: "https://ba-footblog.vercel.app/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //       ]
  //     }
  //   ]
  // }

}

// vercel.app
// vercel.com