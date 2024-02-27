import {useState}from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsvalidPresupuesto}) => {
    const [mensaje, setMensaje] = useState('')
    // crear una funcion para validar el presupuesto
    const handlePresuuesto = (e)=> { // esta funcion se ejecuta cuando yo presione el boton 
    e.preventDefault();

      // negando la condicion
    if(!(presupuesto) ||presupuesto < 0){
        setMensaje('No es un presupuesto valido')

        return // para que no se siga ejecutando la siguiente linea y se rompa el ciclo de la funcion 
    }
    setMensaje('')
    setIsvalidPresupuesto(true)
        
   
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra '>
      <form onSubmit={handlePresuuesto} className='formulario'>
        <div className='campo'>
            <label>Definir Presupuesto</label>
            <input 
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu presupuesto'
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))} // lo que el usuario escribe en ese input actualize
            
            />
            
        </div>
        <input type="submit" value= "Añadir "/>
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>} 

      </form>
    </div>
  )
}

export default NuevoPresupuesto
