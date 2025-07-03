import React, { useState } from 'react';
import './InvoiceApp.css';

const InvoiceApp = () => {
  const [invoice, setInvoice] = useState({
    number: '',
    date: new Date().toISOString().split('T')[0],
    buyerName: '',
    buyerTaxID: '',
    items: [{ description: '', quantity: 0, price: 0 }]
  });

  const [status, setStatus] = useState('');

  const generateXML = () => {
    // Asegúrate de que el XML cumpla con el formato UBL 2.1 de la DIAN
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <fe:Invoice xmlns:fe="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
                  xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
                  xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
        <cbc:UBLVersionID>UBL 2.1</cbc:UBLVersionID>
        <cbc:CustomizationID>10</cbc:CustomizationID>
        <cbc:ProfileID>DIAN 2.1</cbc:ProfileID>
        <cbc:ID>${invoice.number}</cbc:ID>
        <cbc:IssueDate>${invoice.date}</cbc:IssueDate>
        <cac:AccountingCustomerParty>
          <cac:Party>
            <cac:PartyIdentification>
              <cbc:ID>${invoice.buyerTaxID}</cbc:ID>
            </cac:PartyIdentification>
            <cac:PartyName>
              <cbc:Name>${invoice.buyerName}</cbc:Name>
            </cac:PartyName>
          </cac:Party>
        </cac:AccountingCustomerParty>
        <cac:InvoiceLine>
          ${invoice.items.map((item, index) => `
            <cac:InvoiceLine>
              <cbc:ID>${index + 1}</cbc:ID>
              <cbc:InvoicedQuantity>${item.quantity}</cbc:InvoicedQuantity>
              <cbc:LineExtensionAmount currencyID="COP">${item.quantity * item.price}</cbc:LineExtensionAmount>
              <cac:Item>
                <cbc:Description>${item.description}</cbc:Description>
              </cac:Item>
              <cac:Price>
                <cbc:PriceAmount currencyID="COP">${item.price}</cbc:PriceAmount>
              </cac:Price>
            </cac:InvoiceLine>
          `).join('')}
        </cac:InvoiceLine>
      </fe:Invoice>`;
  
    return xml;
  };
  
  const sendToDIAN = async () => {
    try {
      setStatus('sending');
      const xml = generateXML();
      console.log('XML generado:', xml);
      
      // Enviar solo el XML sin envoltura SOAP (el backend se encargará de esto)
      const response = await fetch('http://localhost:3000/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml; charset=utf-8'
        },
        body: xml
      });
  
      const responseText = await response.text();
      console.log('Respuesta del servidor:', responseText);
  
      if (!response.ok) {
        throw new Error(`Error del servidor: ${responseText}`);
      }
  
      setStatus('success');
    } catch (error) {
      console.error('Error detallado:', error);
      setStatus('error');
    }
  };

  const printInvoice = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Factura ${invoice.number}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .items { width: 100%; border-collapse: collapse; }
            .items th, .items td { border: 1px solid #ddd; padding: 8px; }
            .total { margin-top: 20px; text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Factura Electrónica</h1>
            <p>Número: ${invoice.number}</p>
            <p>Fecha: ${invoice.date}</p>
          </div>
          <div>
            <h2>Cliente</h2>
            <p>Nombre: ${invoice.buyerName}</p>
            <p>NIT: ${invoice.buyerTaxID}</p>
          </div>
          <table class="items">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price}</td>
                  <td>$${item.quantity * item.price}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <h3>Total: $${invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)}</h3>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 0, price: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoice({ ...invoice, items: newItems });
  };

  return (
    <div className="mt-40">

    <div className="invoice-app">
      <div className="invoice-card">
        <h1>Facturación Electrónica DIAN</h1>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Número de Factura</label>
            <input
              type="text"
              value={invoice.number}
              onChange={(e) => setInvoice({ ...invoice, number: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Nombre del Cliente</label>
            <input
              type="text"
              value={invoice.buyerName}
              onChange={(e) => setInvoice({ ...invoice, buyerName: e.target.value })}
            />
          </div>
          
          <div className="form-group">
            <label>NIT del Cliente</label>
            <input
              type="text"
              value={invoice.buyerTaxID}
              onChange={(e) => setInvoice({ ...invoice, buyerTaxID: e.target.value })}
            />
          </div>
        </div>

        <div className="items-section">
          <h2>Items</h2>
          {invoice.items.map((item, index) => (
            <div key={index} className="item-grid">
              <div className="form-group">
                <label>Descripción</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Cantidad</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          ))}
          <button onClick={addItem} className="button secondary">Agregar Item</button>
        </div>

        <div className="button-group">
          <button onClick={sendToDIAN} className="button primary">
            Enviar a DIAN
          </button>
          <button onClick={printInvoice} className="button primary">
            Imprimir
          </button>
        </div>

        {status && (
          <div className={`status-message ${status}`}>
            {status === 'success' ? 'Factura enviada exitosamente' :
             status === 'error' ? 'Error al enviar la factura' :
             'Enviando...'}
          </div>
        )}
      </div>
    </div>
    </div>

  );
};

export default InvoiceApp;