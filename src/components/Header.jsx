import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto, 
  isvalidPresupuesto,
  setIsvalidPresupuesto
}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {isvalidPresupuesto ? (
        <ControlPresupuesto

        gastos={gastos}
        setGastos= {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        setIsvalidPresupuesto = {setIsvalidPresupuesto}
        />
      ): (

      <NuevoPresupuesto
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      setIsvalidPresupuesto = {setIsvalidPresupuesto}
      
      />
      )}
    </header>
    
  )
}

export default Header
