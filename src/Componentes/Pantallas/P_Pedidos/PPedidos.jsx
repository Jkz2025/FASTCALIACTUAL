import React, { useState } from 'react';
import CreatePedidos from '../../Pedidos/CreatePedidos';
import Pedidos from '../../Pedidos/Pedidos';
import Button from '../../Dashboard/Components/Button';
import styles from '../../../../src/style';
import PedidosForm from '../../Pedidos/PedidosForm';

const PPedidos = () => {
  return (
    <div className="mt-40"> {/* Ajusta el margen superior según la altura del Navbar */}
      <PedidosForm />
      <Pedidos />
    </div>
  );
}

export default PPedidos;
