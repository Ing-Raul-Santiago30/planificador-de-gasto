import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { object } from 'prop-types'

function App() {
  // estos son los hook
  const [gastos, setGastos] = useState (
    // comprobamos que existe un localstorage gasto si no existe iniciamos con un arreglo vacio
    // si existe inicia con lo que hay en localstorage pero como va hacer un string lo quiero
    // convertir a un arreglo
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const[presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0 // local storage si no exite lo agrega en cero
  )
  const [isvalidPresupuesto, setIsvalidPresupuesto] = useState(false)
  
  const[modal, setModal] = useState(false)
  const[animarModal, setAnimarModal] = useState(false)

  const[gastoEditar, setGastoEditar] = useState({})

  const[filtro, setFiltro] = useState('')
  const[gastosFiltrados, setGastosFiltrados] = useState([])

  // un useEfectt que va estar escuchando por los cambios que sucedan en este objeto gastoEditar
  useEffect(() =>{
      if(Object.keys(gastoEditar).length > 0 ){
        // para mandar a llamar al modal
        setModal(true)

        setTimeout(()=>{
         setAnimarModal(true)
        },500);
      }

  }, [gastoEditar])

  // para almacenar en el localstore que va a tener como dependecia el presupuesto
  useEffect(()=>{

    // localStorage
    localStorage.setItem('presupuesto',presupuesto ?? 0) // en caso de que esta variable este presente va 0
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos',JSON.stringify(gastos) ?? []); // para convertir un arreglo a un string

  }, [gastos]) // va estar escuchando los cambios que sucedan en gastos 
  
  useEffect(()=>{ // para los gastos que sucedan en usestate
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
      
      
    }
    
    
    


  }, [filtro])

  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0) {
      setIsvalidPresupuesto(true)
    }

  }, []); //este useEfect va a cargar una sola vez




  const handleNuevoGasto = ()=>{
    setModal(true)
    setGastoEditar({})

    setTimeout(()=>{
     setAnimarModal(true)
    },500);
  }
  const guardarGastos = gasto =>{
  
    if(gasto.id) {
    // vamos actualizar
    const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
    setGastos(gastosActualizados);
    setGastoEditar({}) // resetear el gasto  a un objeto
  }else{
    // Nuevo Gasto
    gasto.id = generarId();
    // guardar la fecha
    gasto.fecha = Date.now(); // retorna la fecha en la que se agrego ese gasto
    setGastos([...gastos,gasto])
  }

    // hace que modal se cierre cuando guardamos el gastos  y pasarlo al listado de gasto
    setAnimarModal(false)

    setTimeout(()=>{
        setModal(false)
       },500);

  }

  // para eliminar un gasto de la pantalla con esta funcion, se la pasamos a listadogasto extraer,pasaarla al gasto extraerlo y requirir el ij


  const eliminarGasto  = id =>{
    // solamente toma un id, y decimos que la variable temporal va a traer todo los que sean diferentes 
    // al id que le estamos pasando 
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
   
    <div className={modal ? 'fijar':''}> 
      <Header 
      gastos= {gastos}
      setGastos ={setGastos}
      presupuesto = {presupuesto}
      setPresupuesto = {setPresupuesto}
      isvalidPresupuesto = {isvalidPresupuesto}
      setIsvalidPresupuesto = {setIsvalidPresupuesto}
      
      
      />
    {isvalidPresupuesto && (
      <>
      <main>
        <Filtros
        filtro = {filtro}
        setFiltro={setFiltro}
        
        
        />
        <ListadoGastos
        gastos={gastos}
        setGastoEditar={setGastoEditar}
        eliminarGasto = {eliminarGasto}
        filtro = {filtro}
        gastosFiltrados ={gastosFiltrados}

        
        />

      </main>

    <div className='nuevo-gasto'>
      <img 
      src={IconoNuevoGasto}
      alt=' icono nuevo gasto'
      onClick={handleNuevoGasto}
      
      />

    </div>
    </>
    )}

    {modal && <Modal
    setModal={setModal}
    animarModal = {animarModal}
    setAnimarModal = {setAnimarModal}
    guardarGastos = {guardarGastos}
    gastoEditar = {gastoEditar}
    setGastoEditar = { setGastoEditar}
    
    />}
    
    </div>
    
    
  )
  
}

export default App
