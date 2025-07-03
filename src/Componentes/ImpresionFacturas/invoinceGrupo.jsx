import React, { forwardRef } from 'react';
import Invoice from './Invoice';

const InvoiceGroup = forwardRef(({ invoices }, ref) => {
  console.log('Facturas recibidas en InvoiceGroup:', invoices);
  return (
    <div ref={ref}>
      {invoices.map((invoice, index) => (
        <div key={index} style={{pageBreakAfter: 'always'}}>
          <Invoice data={invoice} />
        </div>
      ))}
    </div>
  );
});

export default InvoiceGroup;