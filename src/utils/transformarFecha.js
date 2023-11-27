export const transformarFecha = (fecha) => {
    const partesFecha = fecha.split('/')
    const dia = parseInt(partesFecha[0], 10)
    const mes = parseInt(partesFecha[1], 10) - 1
    const anio = parseInt(partesFecha[2], 10)

    return new Date(anio, mes, dia)
}