import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarImagen from '../img/cerrar.svg'


const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGastos,
    gastoEditar,
    setGastoEditar
}) => {
    const[mensaje, setMensaje] = useState('');
    const[nombre,setNombre] = useState('')
    const[cantidad,setCantidad] = useState('')
    const[categoria,setCategoria] = useState('')
    const[fecha, setFecha] = useState('')
    const[id, setId] = useState('')

    useEffect(() =>{
        if(Object.keys(gastoEditar).length > 0 ){
          // para mandar a llamar al modal
         setNombre(gastoEditar.nombre)
         setCantidad(gastoEditar.cantidad)
         setCategoria(gastoEditar.categoria)
         setId(gastoEditar.id)
         setFecha(gastoEditar.fecha)
      }
     
    }, [])



    const ocultarModal = () =>{
        
        setAnimarModal(false)
        setGastoEditar({}) // para resetear un objeto vacio 
        setTimeout(()=>{
            setModal(false)
           },500);
         
    }
    const handleSubmit = e =>{
        e.preventDefault(); // para prevenir la accion por defecto del formularui
        console.log('Enviando Formulario')

        // validar el formulario
        // generamos un arreglo que va a verificar que por lo menos uno este vacio 
        if([ nombre, cantidad, categoria ].includes('')){ // si algunos de los 3 esta vacio fallo la validacion
           setMensaje('TODOS LOS CAMPOS SON OBLIGATORIOS')

           setTimeout(() => {
            setMensaje('')
           }, 3000)
           
            return; // para que no  ejecute la siguiente linea despues del return
        }
        guardarGastos({nombre, cantidad, categoria,id,fecha})
    }
  return (
    <div className="modal">
        <div className="cerrar-modal">
         <img
         src={CerrarImagen}
         alt='cerrar modal'
         onClick={ocultarModal}
         />

        </div>
        <form 
        // registrar un evento en el formulario 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" :'cerrar'}`}
        
        
        >

            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {/*cuando mensaje tenga algo entonces cargamos el componente de mensaje */}
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>} 
            <div className='campo'>
                <label htmlFor="nombre">Nombre Gastos</label>
                <input 
                id='nombre'
                type='text'
                placeholder='Añade en Nombre del Gasto'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                
                />
            </div>
            <div className='campo'>
                <label htmlFor="nombre">Cantidad</label>
                <input 
                id='cantidad'
                type='text'
                placeholder='Añade la cantidad del Gasto 300'
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))}
                
                />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>
                <select 
                id='categoria'
                value={categoria}
                onChange={e => setCategoria((e.target.value))}
                

                >
                    <option value="">---Seleccione---</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>

                    

                </select>
            </div>
            <input 
            type="submit"
            value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gastos'}
             />
        </form>
      
    </div>
  )
}

export default Modal
