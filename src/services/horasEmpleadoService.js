import { HorasEmpleado } from "../models/horasEmpleadoModel.js";
import { empleado } from "../controllers/empleadosController.js";
import { transformarFecha } from "../utils/transformarFecha.js";
export class HorasEmpleadoService {
    constructor() {
        this.existe = async function (datos) {
            let existente = await empleado.buscarUnEmpleado({ id_empleado: datos.id_empleado })
            return existente
        }
    }
    async ingresarHoras(datos) {
        try {
            if (Object.keys(datos).length === 0) {
                return 'Ingrese los datos'
            } else {
                if (Object.keys(datos).length >= 4) {
                    if (await this.existe(datos)) {
                        datos.fecha = transformarFecha(datos.fecha)
                        let registroExiste = await HorasEmpleado.findOne({
                            where: {
                                id_empleado: datos.id_empleado,
                                fecha: datos.fecha,
                            }
                        })
                        if (registroExiste) {
                            return `En la fecha ${datos.fecha}, ya existe un registro con el id ${datos.id_empleado}`
                        } else {
                            let horasCargadas = await HorasEmpleado.create(datos)
                            return horasCargadas.dataValues
                        }
                    } else {
                        return 'El empleado no existe'
                    }
                } else {
                    return 'Datos faltantes'
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async modificarHora(datos) {
        try {
            if (Object.keys(datos).length === 0) {
                return `Ingrese los datos`
            } else {
                if (Object.keys(datos).length >= 4) {
                    if (await this.existe(datos)) {
                        datos.fecha = transformarFecha(datos.fecha)
                        let registroExiste = await HorasEmpleado.findOne({
                            where: {
                                id_empleado: datos.id_empleado,
                                fecha: datos.fecha,
                            }
                        })
                        if (registroExiste) {
                            await registroExiste.update(datos)
                            return registroExiste
                        } else {
                            return `El registro no existe`
                        }
                    } else {
                        return 'El empleado no existe'
                    }
                } else {
                    return 'Datos faltantes'
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    async buscarRegistro(datos) {
        try {
            if (this.existe(datos)) {
            }
        } catch (error) {
            console.log(error)
        }
    }
}