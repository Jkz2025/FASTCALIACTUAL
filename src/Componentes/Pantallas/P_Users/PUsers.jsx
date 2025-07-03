import React from 'react'
import Users from '../../Users/Users'
import CreateUser from '../../Users/CreateUser'
import UsersSearchForm from '../../Users/UsersSearchaForm'

const PUsers = () => {

  

  return (
    <>
      <div className="mt-40"> {/* Ajusta el margen superior según la altura del Navbar */}
        < UsersSearchForm />
        <Users />
      </div>
    </>
  )
}

export default PUsers
