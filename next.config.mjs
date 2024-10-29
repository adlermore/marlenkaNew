const nextConfig = {
    reactStrictMode : false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '165.232.47.193',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'a4.espncdn.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname: 'a3.espncdn.com',
          pathname: '**',
        },
        {
          protocol: 'https',
          hostname : 'www.usmagazine.com',
          pathname: '**',
        }
      ]
    }
  };
  
  export default nextConfig;