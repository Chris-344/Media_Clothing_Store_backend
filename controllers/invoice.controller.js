// import path from " path"
// import  fs from "fs"
// import fileURLToPath from 'url'
// const __filename=fileURLToPath(import.meta.url)
// const __dirname=path.dirname(__filename)
// export const invoice = (req, res) =>
// {
//     if(fs.existsSync('../public/bills/invoice.pdf')){

//         res.download(path.join(__dirname,'../public/bills/invoice.pdf'),(err)=>
//         console.log("invoice",err))
//     }
//     setTimeout(()=>{
//         if(fs.existsSync('../public/bills/invoice.pdf')){
//             fs.unlink('../public/bills/invoice.pdf')
//         }
//     })
// }
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const invoice = (req, res) =>
{
    const filePath = path.join(__dirname, '../public/bills/invoice.pdf');
    console.log(filePath);
    if (fs.existsSync(filePath))
    {
        res.download(filePath, (err) =>
        {
            if (err)
            {
                console.log('Error sending invoice:', err);
                res.status(500).send('Error sending invoice');
            } else
            {
                setTimeout(() =>
                {
                    if (fs.existsSync(filePath))
                    {
                        fs.unlink(filePath, (err) =>
                        {
                            if (err)
                            {
                                console.log('Error deleting invoice:', err);
                            } else
                            {
                                console.log('Invoice deleted successfully');
                            }
                        });
                    }
                }, 30000); // Delay to ensure the file is sent before deletion
            }
        });
    } else
    {
        res.status(404).send('Invoice not found');
    }
};