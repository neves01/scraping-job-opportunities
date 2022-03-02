# About
A scraping tool to bring all job opportunities from the main brazilian search sites.

# How to use
Inside of the Main block code (index.js), choose your site. The options are:
- BNE;
- Trabalha Brasil;
- Catho;
- Vagas.

Execute from the terminal: `node index.js`.

# Output
The output will be a JSON format data with the following attributes: job, description, date, schooling, company, and local.

# What was needed?
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [node-fetch](https://www.npmjs.com/package/node-fetch)

# TO DO
- page iterating
- configure routes for API calls?
- JSON output file
