import { HorasEmpleadoService } from "../services/horasEmpleadoService.js"
const horasEmpleado = new HorasEmpleadoService()

export class HorasEmpleadoController {
    cargarHoras = async (req, res) => {
        try {
            let datos = req.body
            let horasIngresadas = await horasEmpleado.ingresarHoras(datos)
            res.send(horasIngresadas)

        } catch (error) {
            console.log(error)
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