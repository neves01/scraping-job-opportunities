# About
A scraping tool to bring all job opportunities from the main brazilian search sites.

# How to use
Inside of Main block code (index.js), choose your site. The options are:
- BNE
- Trabalha Brasil
- Catho
- Vagas.

Execute from the terminal with `node index.js`.

# Output
The output will be a JSON file with the following attributes: job, description, date, schooling, company, and local.

# What I used?
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
