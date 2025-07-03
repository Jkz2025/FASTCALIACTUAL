import React from 'react'
import CreateBodega from '../../Bodega/CreateBodega'
import Bodega from '../../Bodega/Bodega'
import BodegaSearchForm from '../../Bodega/BodegaSearchForm'

const PBodegas = () => {
  return (
    <div className="mt-40"> {/*   Ajusta el margen superior según la altura del Navbar */}
    <BodegaSearchForm />
        <Bodega />
    </div>
  )
}

export default PBodegas
