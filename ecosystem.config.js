module.exports = {
  apps: [
    {
      name: "FolioGenie Web App",
      script: "http-server-spa ./dist/folio-genie-web-app index.html 4200",
    },
  ],
};
