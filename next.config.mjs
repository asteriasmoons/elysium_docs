import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  output: "standalone",
  outputFileTracingIncludes: {
    "/docs/[...slug]": ["./docs/**/*"],
  },
};

export default withMDX(nextConfig);
