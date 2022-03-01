const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

const consult = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // extracting information from code
    let data = await page.evaluate(() => {

        let quotesElement = document.body.querySelectorAll('li[class^=vaga]');
        let quotes = Object.values(quotesElement).map(x => {
            return {
                job: x.querySelector('.link-detalhes-vaga').textContent ?? null,
                description: x.querySelector('.detalhes > p').textContent ?? null,
                date: x.querySelector('.data-publicacao').textContent ?? null,
                schooling: x.querySelector('.nivelVaga').textContent ?? null,
                company: x.querySelector('.emprVaga').textContent ?? null,
                local: x.querySelector('.vaga-local').textContent ?? null,
            }
        });

        return quotes;

    });

    await browser.close();

    return data;
}

// max page = 250
const vagas = async () => {
    let page = 1, url_http = 'https://www.vagas.com.br/vagas-de-*?&pagina=' + page, stack = [];

    for (let i = 1; i <= 10; i++) {
        let url = url_http + i;
        let data = await consult(url);
        stack.push(data)
    }

    console.log(stack)
}

//https://www.trabalhabrasil.com.br/api/v1.0/Job/List?idFuncao=0&idCidade=0&pagina=4&pesquisa=&ordenacao=1&idUsuario=&flgHomeOffice=false
const trabalhabrasil = async () => {
    let url = 'https://www.trabalhabrasil.com.br/api/v1.0/Job/List?idFuncao=0&idCidade=0&pagina=4&pesquisa=&ordenacao=1&idUsuario=&flgHomeOffice=false';
    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    console.log(data);
}

const catho = async () => {
    let url = 'https://www.catho.com.br/vagas/_next/data/TDI23wsLXyBT00PWn8sxs/index.json?page=1';

    const response = await fetch(url);

    // Storing data in form of JSON
    let data = await response.json();
    console.log(data['pageProps']['jobSearch']['jobSearchResult']['data']['jobs']);
}

const consult_bne = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // extracting information from code
    let data = await page.evaluate(() => {
        let quotesElement = document.body.querySelectorAll('.job');
        let quotes = Object.values(quotesElement).map(x => {
            return {
                job: x.querySelector('.job__title').textContent.trim().replace(/\s+/g, ' ').split(' Seja um dos primeiros')[0].split('Vaga de ')[1] ?? null,
                //description: x.querySelector('.detalhes > p').textContent ?? null,
                //date: x.querySelector('.data-publicacao').textContent ?? null,
                //schooling: x.querySelector('.nivelVaga').textContent ?? null,
                company: x.querySelector('div[class^=job__header] :nth-child(5)').textContent.trim().replace(/\s+/g, ' ') ?? null,
                local: x.querySelector('div[class^=job__header] :nth-child(3)').textContent.trim().replace(/\s+/g, ' ') ?? null,
            }
        });

        return quotes;

    });

    await browser.close();

    return data;
}

// max page = ??
const bne = async () => {
    let page = 1, url_http = 'https://www.bne.com.br/vagas-de-emprego/?Page=' + page, stack = [];

    for (let i = 1; i <= 10; i++) {
        let url = url_http + i;
        let data = await consult_bne(url);
        stack.push(data)
    }

    console.log(stack)
}

// MAIN
//vagas();
//trabalhabrasil();
//catho();
bne();
