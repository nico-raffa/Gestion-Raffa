import { HorasEmpleadoService } from "../services/horasEmpleadoService.js"
import { empleado } from "../controllers/empleadosController.js";

const horasEmpleado = new HorasEmpleadoService()

export class HorasEmpleadoController {
    constructor() {
        this.empleadoExiste = async function (datos) {
            let existente = await empleado.buscarEmpleadoPorId({ id_empleado: datos.id_empleado })
            return existente
        }
    }
    planillaCargarHoras = async (req, res) => {
        try {
            const idEmpleado = req.params
            const empleadoExiste = await this.empleadoExiste(idEmpleado)
            if (!empleadoExiste) {
                throw new Error(`El empleado con el ID ${idEmpleado} no existe`)
            }
            res.render('cargarHoras', {
                empleadoExiste
            })

        } catch (error) {
            console.log(error)
        }
    }
    cargarHoras = async (req, res) => {
        try {
            const camposObligatorios = ['id_empleado', 'fecha', 'horas_trabajadas']
                .filter(atributo => !req.body[atributo])
            if (camposObligatorios.length !== 0) {
                throw new Error(`Datos obligatorios:${camposObligatorios.join(", ")}.`)
            }
            let resultado = await horasEmpleado.ingresarHoras(req.body)
            if (resultado.success === false) throw new Error(resultado.error)
            // res.redirect(`/empleados/horas/${}`)

        } catch (error) {
            res.status(400).render('error', { error })
        }
    }
    mostrarHorasPorEmpleado = async (req, res) => {
        try {
            const { id_empleado, fecha } = req.query
            const empleadoExiste = await this.empleadoExiste(id_empleado)
            if (!empleadoExiste) {
                throw new Error(`El empleado con el ID ${id_empleado} no existe`)
            }
            // console.log ({id_empleado,fecha})
            const datos = {
                id_empleado: id_empleado,
                fecha: fecha
            }
            const horasPorEmpleado = await horasEmpleado.buscarHorasPorEmpleado(datos)
            res.render('horasCargadas', {})
        } catch (error) {
            res.status(400).render('error', { error })
        }
    }
    modificarHoras = async (req, res) => {
        try {
            let datos = req.body
            let horasModificadas = await horasEmpleado.modificarHora(datos)
            res.send(horasModificadas)
        } catch (error) {
            console.log(error)
        }
    }

}