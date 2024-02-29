module.exports = {
  apps: [
    {
      name: "FolioGenie Web App",
      script: "npm run start",
      env: {
        NODE_ENV: "production",
        PM2_SERVE_PATH: './dist/folio-genie-web-app',
        PM2_SERVE_PORT: 4202,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: './index.html'
    },
    },
  ],
};
