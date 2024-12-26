import PDFDocument from 'pdfkit';
import fs from 'fs';

export const createBillPDF = async (order, user) => {
  try {
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(fs.createWriteStream('./public/bills/invoice.pdf'));
// doc.font('Helvetica ')
    // Header
    doc
      .fontSize(20)
      .text('NEO CLOTHING', { align: 'left' })
      .fontSize(10)
      .text('BRIGHT LIKE NEO', { align: 'left' })
      .moveDown()
      .fontSize(20)
      .fillColor('red')
      .text('INVOICE', { align: 'right' })
      .moveDown();

    // Invoice Details
    doc
      .fontSize(12)
      .fillColor('black')
      .text(`Invoice to: ${user.username}`, { align: 'left' })
      .text(`Address: ${user.addrCountry} ${user.addrState} ${user.addrCity} ${user.addrStreetName}  ${user.addrRoad} ${user.addrLandmark} ${user.addrPinCode}`, { align: 'left' })
      .moveDown()
      .text(`Invoice#: ${user.productId}`, { align: 'right' })
      .text(`Date: ${new Date(order.date).toLocaleDateString()}`, { align: 'right' })
      .moveDown();

    // Table Header
    doc
      .fontSize(12)
      .text('SL.', 50, 200)
      .text('Item Description', 100, 200)
      .text('Price', 300, 200)
      .text('Qty.', 370, 200)
      .text('Total', 420, 200)
      .moveDown();

    // Table Rows
    let y = 220;
    order.cartItems.forEach((item, index) => {
      doc
        .text(index + 1, 50, y)
        .text(item.title, 100, y)
        .text(`Rs.${Number(item.price).toFixed(2)}`, 300, y)
        .text(user.quantity, 370, y)
        .text(`Rs.${(Number(item.price) * item.qty).toFixed(2)}`, 420, y);
      y += 20;
    });

    // Summary
    doc
      .moveDown()
      .text(`Sub Total:  Rs.${Number(order.itemsPrice).toFixed(2)}`, { align: 'right' })
      .text(`Shipping Price: Rs.${Number(order.shippingPrice).toFixed(2)}`, { align: 'right' })
      .text(`Tax Price: Rs.${Number(order.taxPrice).toFixed(2)}`, { align: 'right' })
      .text(`Total Price: Rs.${Number(order.totalPrice).toFixed(2)}`, { align: 'right' })
      .moveDown();

    // Footer
    doc.text('Thank you for buying',  250,720)
      .moveDown().moveDown()
    //   .text('Payment Info:', { align: 'left' })
    //   .text(`Account #: ${order.paymentInfo.accountNumber}`, { align: 'left' })
    //   .text(`AC Name: ${order.paymentInfo.accountName}`, { align: 'left' })
    //   .text(`Bank Details: ${order.paymentInfo.bankDetails}`, { align: 'left' })
    //   .moveDown()
    //   .text('Terms & Conditions:', { align: 'left' })
    //   .text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dignissim ipsum nec efficitur cursus. Integer tempor massa in nisi pretium, eleifend vehicula mauris. Nullam port.', { align: 'left' });

    doc.end();

  } catch (error) {
    console.error('Error creating PDF:', error);
    throw error; // Re-throw the error for proper handling in the calling function
  }
};
