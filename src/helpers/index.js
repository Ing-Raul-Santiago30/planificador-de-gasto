export const generarId = () =>{
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

// para poner el formato de las fechas 
export const formatearFecha = fecha =>{
    const fechaNueva = new Date(fecha); 
    const  opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    // lo que vamos a formatear 
    return fechaNueva.toLocaleDateString('es-Es',opciones)
    
}