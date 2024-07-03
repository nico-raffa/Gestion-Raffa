import { FinanzasService } from "../services/finanzasService.js"
const finanzas = new FinanzasService()

export class FinanzasController {
    ingresarMovimiento = async (req, res) => {
        try {
            const respuesta = await finanzas.registrarMovimiento(req.body)
            res.render('movimientoIndividual', { respuesta })
        } catch (error) {
            res.render('error', { error })
        }
    }
    mostrarMovimientos = async (req, res) => {
        try {
            let filtro = req.query.filtro
            let busqueda = req.query.busqueda
            let datos = {
                filtro, busqueda
            }
            const dato = {}
            dato[datos.filtro] = datos.busqueda
            if (!filtro) {
                const respuesta = await finanzas.verRegistros()
                res.render('planillaFinanzas', { respuesta })
                return
            }
            const respuesta = await finanzas.verRegistros(dato)
            res.render('planillaFinanzas', { respuesta })
        } catch (error) {
            res.render('error', { error })
        }
    }
    mostrarUnMovimiento = async (req, res) => {
        try {
            const filtro = req.query.filtro
            const busqueda = req.query.busqueda
            let datos = {
                filtro, busqueda
            }
            const dato = {}
            dato[datos.filtro] = datos.busqueda
            const respuesta = await finanzas.verUnRegistro(dato)
            res.render('movimientoIndividual', { respuesta })
        } catch (error) {
            res.render('error', { error })
        }
    }
    mostrarResumen = async (req, res) => {
        try {
            const respuesta = await finanzas.verResumen()
            const balances = await finanzas.balances(new Date)
            res.render('gestion', { respuesta, balances })
        } catch (error) {
            res.render('error', { error })
        }
    }
}