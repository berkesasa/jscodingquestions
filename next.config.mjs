/** @type {import('next').NextConfig} */
const isProjectPages = process.env.NEXT_PUBLIC_BASE_PATH === '/jscodingquestions';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProjectPages ? '/jscodingquestions' : undefined,
  assetPrefix: isProjectPages ? '/jscodingquestions' : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
  },
};

export default nextConfig;
