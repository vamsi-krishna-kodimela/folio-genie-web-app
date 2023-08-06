module.exports = {
  apps: [
    {
      name: "FolioGenie Web App",
      script: "http-server ./dist/folio-genie-web-app -p 4200 -P http://localhost:4200?",
    },
  ],
};
