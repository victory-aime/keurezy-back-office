import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/pdfjs-dist/build/pdf.worker.min.mjs",
            to: "../public/pdf.worker.min.mjs",
          },
        ],
      }),
    );
    return config;
  },
  turbopack: {},
  /* use redirect proxy for api calls
   * every request to /api/* will be redirected to the backend server
   * */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_BACKEND_URL}/api/:path*`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${process.env.API_BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
