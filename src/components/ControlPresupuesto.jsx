import {useState,useEffect} from 'react'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
  
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsvalidPresupuesto

}) => {

  const[porcentaje, setPorcentaje] = useState(100)
  const[disponible, setDisponible] = useState(0)
  const[gastado, setGastado] = useState(0)

  useEffect(() => {
   const totalGastado = gastos.reduce((total,gasto)=>gasto.cantidad + total,0);// los gastos disponible 
   const totalDisponible = presupuesto - totalGastado; // nos da cuanto dinero hay disponible

   // calcular el total porcentaje gastado
   const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
  
  setDisponible(totalDisponible)
  setGastado(totalGastado)
  setTimeout(() => {
    setPorcentaje(nuevoPorcentaje)
    
  }, 1200);
  
  }, [gastos])
  

    const formatearCantidad =(cantidad) => {
       return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })
    }
    const handleResetApp = () =>{
    const resultado = confirm( '¿Deseas reiniciar el presupuesto Y gastos?');

    if(resultado){
      setGastos([]);
      setPresupuesto(0)
      setIsvalidPresupuesto(false)
      
    }
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
        
            <CircularProgressbar 
            styles={buildStyles({
              pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
              trailColor: '#F5F5F5',
              textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
            })}
            value={porcentaje} // este va hacer el progreso
            text={`${porcentaje}% Gastado`}
            
            />
        </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app'
        type='button'
        onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
            <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
            <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
            <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
