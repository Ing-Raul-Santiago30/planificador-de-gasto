import React, { Children } from 'react'

// de esta forma creo un componente que le puedo pasar diferentes tipos 
const Mensaje = ({children, tipo}) => { // coje 2 propt
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje
