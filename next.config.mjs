const nextConfig = {
    reactStrictMode : false,
    experimental: {
      forceSwcTransforms: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '165.232.47.193',
          pathname: '**',
        }
      ]
    }
  };
  
  export default nextConfig;