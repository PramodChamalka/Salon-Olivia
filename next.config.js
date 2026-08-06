/** @type {import('next').NextConfig} */
const nextConfig = {
  // `next build` uses Turbopack, which resolves react-joyride's ESM build
  // fine on its own; this empty config just opts in explicitly so Next 16
  // doesn't warn about the webpack-only override below.
  turbopack: {},
  // react-joyride's ESM build ("exports".import) statically re-exports the
  // deprecated `unmountComponentAtNode` from "react-dom", which webpack's
  // CJS/ESM interop cannot verify and treats as a hard build error under
  // `next dev --webpack`. Its CJS build accesses the same API at runtime
  // instead, sidestepping the static export check. Turbopack (used for
  // `next build`) is unaffected and ignores this webpack-only override.
  // next.config.js runs under CJS, so require.resolve() here follows the
  // "require" export condition straight to the CJS build.
  webpack: (config) => {
    config.resolve.alias["react-joyride"] = require.resolve("react-joyride");
    return config;
  },
};

module.exports = nextConfig;
