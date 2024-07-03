import { HorasEmpleado } from "../models/horasEmpleadoModel.js"
import { transformarFecha } from "../utils/fecha.js"
import { Sequelize } from "sequelize"
import moment from "moment"
export class HorasEmpleadoService {

    async ingresarHoras(datos) {
        try {
            const { id_empleado, fecha, horas_trabajadas } = datos

            const horasDelEmpleado = await this.fechaExiste(datos)
            if (horasDelEmpleado) {
                throw new Error(`En la fecha ${moment(fecha, 'YYYY/MM/DD').format('DD-MM-YYYY')}, ya existe un registro con el id ${id_empleado}`)
            }

            const parsedDate = moment(fecha, 'YYYY/MM/DD').format('YYYY-MM-DD')
            const yearMonth = moment(fecha, 'YYYY/MM/DD').format('YYYY-MM')
            const startOfMonth = `${yearMonth}-01`
            const endOfMonth = moment(parsedDate).endOf('month').format('YYYY-MM-DD')
            const registroExistente = await HorasEmpleado.findOne({
                where: {
                    id_empleado,
                    fecha: {
                        [Sequelize.Op.between]: [startOfMonth, endOfMonth]
                    }
                },
                order: [['fecha', 'DESC']]
            })

            if (registroExistente) {
                // No es el primer registro del mes, sumar las horas
                datos.total_mensual = registroExistente.total_mensual + Number(horas_trabajadas)
            } else {
                // Es el primer registro del mes
                datos.total_mensual = horas_trabajadas
            }
            // datos.total_mensual = horasDelEmpleado.total_mensual + horas_trabajadas
            let horasCargadas = await HorasEmpleado.create(datos)
            return horasCargadas.dataValues


        } catch (error) {
            return { success: false, error: error.message }
        }
    }
    async modificarHora(datos) {
        try {
            if (Object.keys(datos).length === 0) {
                return `Ingrese los datos`
            } else {
                if (Object.keys(datos).length >= 4) {
                    if (await this.empleadoExiste(datos)) {
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
    async buscarHorasPorEmpleado(datos) {
        try {
            const { id_empleado, fecha } = datos

            const parsedDate = moment(fecha, 'YYYY/MM/DD').format('YYYY-MM-DD')
            const yearMonth = moment(fecha, 'YYYY/MM/DD').format('YYYY-MM')
            const startOfMonth = `${yearMonth}-01`
            const endOfMonth = moment(parsedDate).endOf('month').format('YYYY-MM-DD')

            // Buscar si ya existe un registro para el mismo empleado y mes
            const registroExistente = await HorasEmpleado.findAll({
                where: {
                    id_empleado,
                    fecha: {
                        [Sequelize.Op.between]: [startOfMonth, endOfMonth]
                    }
                },
                order: [['fecha', 'DESC']]
            })
            
            return registroExistente
        } catch (error) {
            console.log(error)
        }
    }
    async fechaExiste(datos) {
        try {
            const registroExistente = await HorasEmpleado.findOne({
                where: {
                    id_empleado: datos.id_empleado,
                    fecha: datos.fecha
                }
            })
            return registroExistente
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}