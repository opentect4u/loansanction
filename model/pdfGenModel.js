const puppeteer = require('puppeteer'),
path = require('path');
require('dotenv').config()

module.exports = {
    generatePdf: (encFlag, id, bank_id) => {
        return new Promise(async (resolve, reject) => {
            try{
                const browser = await puppeteer.launch({headless: 'new'});
                const page = await browser.newPage();
            
                // Replace with your form page URL or HTML content
        
                await page.goto(`${process.env.BASE_URL}/admin/application_form?flag=${encFlag}&id=${id}&bank_id=${bank_id}`, { waitUntil: 'networkidle0' });
            
                // Generate PDF
                const pdfBuffer = await page.pdf({ 
                    format: 'A4',
                    printBackground: true,
                    margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" }
                });
            
                await browser.close();
            
                // Define file path to save PDF on the server (optional)
                // const filePath = path.join('assets', 'uploads', 'form1.pdf');
                // require('fs').writeFileSync(filePath, pdfBuffer);
        
                // console.log(pdfBuffer);
                
            
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="form.pdf"',
                    'Content-Length': pdfBuffer.length
                });
        
                // Send the PDF buffer as a binary response
                res.end(pdfBuffer, 'binary');
            }catch(err){
                console.log(err);
                res.send(err)
            }
        })
    }
}