import * as express from 'express';
import * as puppeteer from 'puppeteer';

const pdfOptions = {
    printBackground: true,
    landscape: false,
    format: 'a4',
    preferCSSPageSize: true // can pass size and such with @page selector
};

async function renderPdf(htmlData: String, fileName: String) {
    // create a new browser instance, and open a new page
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // set a request interceptor to fake load an website with out html file
    await page.setRequestInterception(true);
    // Capture first request only
    page.once('request', websiteRequest => {
        // Fulfill request with HTML, and continue all subsequent requests
        websiteRequest.respond({body: htmlData});
        page.on('request', req => req.continue());
    });

    await page.goto('http://cv-generator.clockwork', { waitUntil: 'networkidle0' });

    // create the pdf
    const pdfBuffer = await page.pdf(pdfOptions);

    // clear the browser
    await browser.close();
    return pdfBuffer;
}

export default function convert(req: express.Request, res: express.Response) {
    const { data, fileName = 'file' } = req.body;

    return renderPdf(data, fileName)
        .then(pdfBuffer => {
            // send the data to the client
            res.setHeader('Content-Length', pdfBuffer.length);
            res.setHeader('Content-Type', 'pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            res.write(pdfBuffer, 'binary');
            res.end();
        })
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send(err);
        });
}
