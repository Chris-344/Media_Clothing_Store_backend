import PDFDocument from 'pdfkit';
import fs from 'fs';

export const createBillPDF = (order, user) => {
    const doc = new PDFDocument();
    const fileName = `bill.pdf`;

    doc.pipe(fs.createWriteStream(fileName));

    doc.fontSize(20).text('Bill', {
        align: 'center',
    });

    doc.fontSize(12).text(`Order ID: ${order._id || new Date().getTime()}`, {
        align: 'left',
    });

    doc.text(`Name: ${user.username}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Date: ${new Date(order.date).toLocaleString()}`);
    doc.text('---');

    if (order.cartItems && order.cartItems.length > 0) {
        order.cartItems.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.productName} - ${item.quantity || 1} x ₹${item.price}`);
        });
    } else {
        doc.text('No items in the cart.');
    }

    doc.text('---');
    doc.text(`Items Price: ₹${order.itemsPrice}`);
    doc.text(`Shipping Price: ₹${order.shippingPrice}`);
    doc.text(`Tax Price: ₹${order.taxPrice}`);
    doc.text(`Total Price: ₹${order.totalPrice}`);
    doc.end();

    console.log(`Bill generated: ${fileName}`);
};
