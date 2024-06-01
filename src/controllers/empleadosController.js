import { EmpleadosService } from "../services/empleadosService.js"
export const empleado = new EmpleadosService()
export class EmpleadosController {
    crear = async (req, res) => {
        try {
            const resultado = await empleado.ingresarEmpleado(req.body)
            if (resultado.success === false) throw new Error(resultado.error)
            res.render('tarjetaEmpleado', {
                resultado
            })
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    verEmpleado = async (req, res) => {
        try {
            let filtro = req.query.filtro
            let busqueda = req.query.busqueda
            let datos = {
                filtro, busqueda
            }
            const dato = {}
            dato[datos.filtro] = datos.busqueda
            if (!filtro) {
                const respuesta = await empleado.buscarEmpleados()
                res.render('verEmpleados', {
                    respuesta
                })
                // res.status(200).send(respuesta)
            } else {
                const respuesta = await empleado.buscarEmpleados(dato)
                if (respuesta.length >= 2) {
                    res.render('verEmpleados', {
                        respuesta
                    })
                    // res.status(200).send(respuesta)
                } else {
                    const resultado = respuesta[0]
                    if (respuesta.length === 0) {
                        res.status(404).send(`Empleado con el ${filtro}: ${busqueda} no existe.`)
                    } else {

                        res.render('tarjetaEmpleado', {
                            resultado
                        })
                    }
                }
                // res.status(200).send(respuesta)

            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    modificarEmpleado = async (req, res) => {
        try {
            const idEmpleado = req.params.id
            const datoNuevo = req.body
            const { id_empleado, ...dato } = datoNuevo
            if (!idEmpleado || Object.values(dato).every(value => value === '')) //{ //<---- MODIFICAR ESTO PARA QUE LAS FECHAS NO SE ENVÍEN COMO 0000-00-00
                return res.status(400).send('Ingrese los datos que quiere modificar.')
            }
            
            await empleado.modificarEmpleado(idEmpleado, dato)

            res.redirect(`/empleados/verEmpleados?filtro=id_empleado&busqueda=${idEmpleado}`)

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    eliminarEmpleado = async (req, res) => {
        let idEmpleado = req.body.id_empleado
        let eliminado = await empleado.eliminarEmpleado(idEmpleado)
        res.send(eliminado)
    }
}