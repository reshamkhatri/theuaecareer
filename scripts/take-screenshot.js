const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log("Launching browser...");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.setViewport({ width: 1280, height: 2500 });
        console.log("Navigating to http://localhost:3000/tools/cv-maker ...");
        
        await page.goto('http://localhost:3000/tools/cv-maker', { waitUntil: 'networkidle2' });
        
        console.log("Taking screenshot...");
        await page.screenshot({ path: 'cv_maker_tool_screenshot.png', fullPage: true });
        
        console.log("Done! Saved to blog_check.png");
        await browser.close();
    } catch (e) {
        console.error("Error:", e);
    }
})();
