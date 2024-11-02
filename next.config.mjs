const nextConfig = {
    reactStrictMode : false,
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