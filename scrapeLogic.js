const puppeteer = require("puppeteer");

const scrapeLogic = async (res) => {
  console.log('Iniciando browser...');
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
    executablePath: '/usr/bin/google-chrome'
  });
  
  try {
    console.log('Browser iniciado');
    const page = await browser.newPage();
    console.log('Nova página criada');

    console.log('Navegando para a página...');
    await page.goto("https://developer.chrome.com/");
    console.log('Navegação completa');

    await page.setViewport({ width: 1080, height: 1024 });
    
    await page.type(".search-box__input", "automate beyond recorder");
    
    const searchResultSelector = ".search-box__link";
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    
    const textSelector = await page.waitForSelector(
      "text/Customize and automate"
    );
    const fullTitle = await textSelector.evaluate((el) => el.textContent);
    
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error('Erro detalhado:', e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser fechado');
    }
  }
};

module.exports = { scrapeLogic };