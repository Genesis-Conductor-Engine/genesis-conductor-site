/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return {
      // Serve the Barcelona-Extropic/ConductorKit design prototype at the root.
      // public/index.html and its dependencies (assets/, components/) are served
      // as static files; this rewrite intercepts "/" before the App Router sees it.
      beforeFiles: [
        { source: "/", destination: "/index.html" },
      ],
    };
  },
};

export default nextConfig;
