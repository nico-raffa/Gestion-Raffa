import moment from "moment"
export const transformarFecha = (fecha) => {
    const partesFecha = fecha.split('/')
    const dia = parseInt(partesFecha[0], 10)
    const mes = parseInt(partesFecha[1], 10) - 1
    const anio = parseInt(partesFecha[2], 10)

    return new Date(anio, mes, dia)
}

export const fechaDiaMesAnio = (fecha) => {
    fecha = new Date(fecha)
    const day = String(fecha.getDate()).padStart(2, '0') 
    const month = String(fecha.getMonth() + 1).padStart(2, '0')
    const year = fecha.getFullYear()

    // Crear una cadena con el formato DD/MM/AAAA
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate
}
export const obtenerMes = (fecha) => {
    const parsedDate = moment(fecha, 'YYYY/MM/DD').format('YYYY-MM-DD')
    const yearMonth = moment(fecha, 'YYYY/MM/DD').format('YYYY-MM')
    const startOfMonth = `${yearMonth}-01`
    const endOfMonth = moment(parsedDate).endOf('month').format('YYYY-MM-DD')
    const meses = {
        startOfMonth,endOfMonth
    }
    return meses
}