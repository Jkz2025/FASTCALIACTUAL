import React, { useState } from "react";

const Table = ({ invoices, onSelectionChange }) => {
  const [facturasSeleccionadas, setFacturasSeleccionadas] = useState([]);

  const handleFacturaSeleccionada = (id) => {
    setFacturasSeleccionadas(prevState => {
      let newState;
      if (prevState.includes(id)) {
        newState = prevState.filter(facturaId => facturaId !== id);
      } else {
        newState = [...prevState, id];
      }
      onSelectionChange(newState);
      return newState;
    });
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const newSeleccionadas = isChecked ? invoices.map(i => i.id) : [];
    setFacturasSeleccionadas(newSeleccionadas);
    onSelectionChange(newSeleccionadas);
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={facturasSeleccionadas.length === invoices.length}
            />
          </th>
          <th>Numero de Factura</th>
          <th>Receptor</th>
          <th>Fecha</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>
              <input
                type="checkbox"
                onChange={() => handleFacturaSeleccionada(invoice.id)}
                checked={facturasSeleccionadas.includes(invoice.id)}
              />
            </td>
            <td>{invoice.numeroFactura}</td>
            <td>{invoice.receptor.nombre}</td>
            <td>{invoice.fecha}</td>
            <td>{invoice.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;