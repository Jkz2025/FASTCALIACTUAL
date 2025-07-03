import React from 'react'
import ListasPrecio from '../../ListasPrecio/ListasPrecio'
import SearchFormListasPrecio from '../../ListasPrecio/searchFormListasPrecio'
const PListas_Precio = () => {
  return (
    <>
      <div className="mt-36  0"> {/* Ajusta el margen superior según la altura del Navbar */}
      <SearchFormListasPrecio />
        <ListasPrecio />
      </div>
    </>
  )
}

export default PListas_Precio
