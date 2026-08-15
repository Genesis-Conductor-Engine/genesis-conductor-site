/** @type {import('next').NextConfig} */

const DASHBOARD = "https://cashflow.genesisconductor.io";
const NEWS = "https://news.genesisconductor.io";
const X402 = "https://api.genesisconductor.io/v2/.well-known/x402";

function jump(source, destination) {
  return { source, destination, permanent: false };
}

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      jump("/cashflow", `${DASHBOARD}/cashflow`),
      jump("/cashflow/:path*", `${DASHBOARD}/cashflow/:path*`),
      jump("/api/cashflow", `${DASHBOARD}/api/cashflow`),
      jump("/news", NEWS),
      jump("/news/:path*", `${NEWS}/:path*`),
      jump("/buy/founders", `${X402}?tier=founders`),
      jump("/buy/source-exclusive", `${X402}?tier=source`),
      jump("/buy/pro", `${X402}?tier=pro`),
      jump("/buy/:path*", X402),
    ];
  },
};

export default nextConfig;
