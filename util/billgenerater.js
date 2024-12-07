import PDFDocument from 'pdfkit';
import fs from 'fs';

export const createBillPDF = (order, user) =>
{
    const doc = new PDFDocument();
    const fileName = `bill_${order._id}.pdf`;

    doc.pipe(fs.createWriteStream(fileName));

    doc.fontSize(20).text('Bill', {
        align: 'center',
    });

    doc.fontSize(12).text(`Order ID: ${order._id}`, {
        align: 'left',
    });

    doc.text(`Name: ${user.userName}`);
    doc.text(`Email: ${user.userEmail}`);
    doc.text(`Date: ${new Date(order.date).toLocaleString()}`);
    doc.text('---');

    order.cartItems.forEach((item, index) =>
    {
        doc.text(`${index + 1}. ${item.productName} - ${item.quantity} x ₹${item.price}`);
    });

    doc.text('---');
    doc.text(`Items Price: ₹${order.itemsPrice}`);
    doc.text(`Shipping Price: ₹${order.shippingPrice}`);
    doc.text(`Tax Price: ₹${order.taxPrice}`);
    doc.text(`Total Price: ₹${order.totalPrice}`);
    doc.end();

    console.log(`Bill generated: ${fileName}`);
};
// // Example usage
// const exampleOrder = {
//     id: '12345',
//     userName: 'John Doe',
//     userEmail: 'john.doe@example.com',
//     date: Date.now(),
//     products: [
//         { name: 'Product 1', quantity: 2, price: 100 },
//         { name: 'Product 2', quantity: 1, price: 200 },
//     ],
//     totalPrice: 400,
// };

// createBillPDF(exampleOrder);
