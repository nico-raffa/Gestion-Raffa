import { EmpleadosService } from "../services/empleadosService.js"
export const empleado = new EmpleadosService()
export class EmpleadosController {
    crear = async (req, res) => {
        try {
            const resultado = await empleado.ingresarEmpleado(req.body)
            if (!resultado) {
                res.status(401).json({
                    mensaje: `Falta(n) el/los siguiente(s) dato(s): ${resultado}`
                })
                return
            } else {
                res.status(200).send(resultado)
            }
        } catch (error) {
            console.log(error)
        }
    }
    verEmpleado = async (req, res) => {
        try {
            let dato = req.body
            if (Object.keys(dato).length === 0) {
                const respuesta = await empleado.buscarEmpleados()
                res.status(200).send(respuesta)
            } else {
                if (dato.id_empleado) { //No se puede preguntar directamente si dato tiene como atributo id_empleado porque devolvería "no se puede leer id_empleado de undefined"
                    const respuesta = await empleado.buscarEmpleadoPorId(dato)
                    if(respuesta){
                        res.status(200).send(respuesta)
                    }else{
                        res.status(404).send(`Empleado con el ID: ${dato.id_empleado} no existe.`)
                    }
                } else {
                    const respuesta = await empleado.buscarEmpleados(dato)
                    res.status(200).send(respuesta)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    modificarEmpleado = async (req, res) => {
        try {
            const idEmpleado = req.body.id_empleado
            const datoNuevo = req.body
            const { id_empleado, ...dato } = datoNuevo
            if (!idEmpleado || Object.keys(dato).length === 0) {
                return res.status(400).send('Ingrese los datos que quiere modificar.')
            } else {
                let respuesta = await empleado.modificarEmpleado(idEmpleado, dato)
                res.send(respuesta)
            }
        } catch (error) {
            console.log(error)
        }
    }
    eliminarEmpleado = async (req, res) => {
        let idEmpleado = req.body.id_empleado
        let eliminado = await empleado.eliminarEmpleado(idEmpleado)
        res.send(eliminado)
    }
}