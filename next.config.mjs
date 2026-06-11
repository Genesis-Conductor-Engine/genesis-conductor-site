/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // /buy/* → x402 catalog on Coalition Gateway
      // founders: all-access bundle (highest tier)
      {
        source: "/buy/founders",
        destination: "https://api.genesisconductor.io/v2/.well-known/x402?tier=founders",
        permanent: false,
      },
      // source-exclusive: source code products (paid-workers, paid-agents)
      {
        source: "/buy/source-exclusive",
        destination: "https://api.genesisconductor.io/v2/.well-known/x402?tier=source",
        permanent: false,
      },
      // pro: individual skills and standard plugin access
      {
        source: "/buy/pro",
        destination: "https://api.genesisconductor.io/v2/.well-known/x402?tier=pro",
        permanent: false,
      },
      // catch-all /buy/* → x402 discovery endpoint
      {
        source: "/buy/:path*",
        destination: "https://api.genesisconductor.io/v2/.well-known/x402",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
