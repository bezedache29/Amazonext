/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_URL_API: "http://localhost:3000/api"
  }
}

module.exports = nextConfig
