const puppeteer = require('puppeteer');
const {TimeoutError} = require('puppeteer/Errors');


let url = `https://www.pof.com/`;

(async () => {
    const browser = await puppeteer.launch({
        waitUntil: 'networkidle2',
        devtools: false,
        headless: false,
        viewport: { width: 1240, height: 600 },
    });
    const page = await browser.newPage();
    await page.goto(url);


    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    await page.setViewport({
        width: dimensions.width,
        height: dimensions.height
    });

    try {
        console.log('Dimensions:', dimensions);

        await page.waitFor('input[name=username]');
        await page.type('input[name=username]', 'bobloblawlaw');
        await page.type('input[name=password]', '7048628e');
        await page.click('[name="login"]')
        await page.waitForNavigation()
        await page.waitFor(10000);
        console.log(Object.keys(page));
    } catch (e) {
        if (e instanceof TimeoutError) {
            // Do something if this is a timeout.

            console.log(e)
            console.log(TimeoutError)
        }
    }

    // get hotel details

    browser.close();
})();



