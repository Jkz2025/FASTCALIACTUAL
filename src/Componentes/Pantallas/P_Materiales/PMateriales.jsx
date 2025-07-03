import React from 'react'
import Materiales from '../../Materiales/Materiales'
import MaterialesForm from '../../Materiales/MaterialesForm'

const PMateriales = () => {
  return (
    <div className="mt-40"> {/*   Ajusta el margen superior según la altura del Navbar */}
      <MaterialesForm />
      <Materiales />
    </div>
  )
}

export default PMateriales
