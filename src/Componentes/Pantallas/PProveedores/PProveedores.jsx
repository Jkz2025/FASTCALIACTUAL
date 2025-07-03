import React from 'react'
import Proveedores from '../../Proveedores/Proveedores'
import ProveedoresSearchForm from '../../Proveedores/ProveedoresSearchForm'

const PProveedores = () => {
  return (
    <div className='mt-40'>
      <ProveedoresSearchForm />
      <Proveedores />
    </div>
  )
}

export default PProveedores
