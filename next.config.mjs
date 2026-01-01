/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase Server Actions body size limit to allow larger uploads (default is 1 MB)
  // Set as a number (bytes). Here we set the limit to 20 MB.
//   serverActions: {
//     bodySizeLimit: 20 * 1024 * 1024, // 20 MB
//   },
//   reactStrictMode: true,
  // Allow Cloudinary images to be used with next/image
  images: {
    domains: ["res.cloudinary.com"], // Allow Cloudinary domain
  },
};

export default nextConfig;
