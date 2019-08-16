const puppeteer = require('puppeteer');
test('Adds two numbers', async ()=>{
    
    const sum = 1 + 2;

    expect(sum).toEqual(3);

})

test('We can lauch a browser', async ()=>{
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = browser.newPage();
    await page.goto('localhost:3000');

})