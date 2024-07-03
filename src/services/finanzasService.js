import { Finanzas } from "../models/finanzasModel.js";
import { Sequelize } from "sequelize";
import moment from "moment";
import { obtenerMes } from "../utils/fecha.js";

export class FinanzasService {
    async registrarMovimiento(mov) {
        try {
            const { fecha } = mov

            if (mov.categoria === "Ventas") {
                mov.tipo = "ingreso"
            } else {

                mov.tipo = "egreso"
            }
            const registroExistente = await this.verificarRegistrosDelMes(fecha)

            if (registroExistente) {

                // Obtener solo los valores de 'categoria' de los registros
                const resultado = await this.balances(fecha)
                console.log(resultado)

                if (mov.tipo === "ingreso") {
                    mov.caja = resultado.caja + Number(mov.cantidad)
                } else {
                    mov.caja = resultado.caja - Number(mov.cantidad)
                }

            } else {
                mov.caja = mov.cantidad
            }

            const registrado = await Finanzas.create(mov)
            return registrado
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
    async verUnRegistro(where) {
        try {
            const registro = await Finanzas.findOne({ where })
            return registro
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
    async verRegistros() {
        try {
            const registros = await Finanzas.findAll()
            return registros
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
    async verResumen() {
        try {
            const ultimosRegistros = await Finanzas.findAll({
                order: [['id', 'DESC']],
                limit: 5
            })
            return ultimosRegistros
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
    async balances(fecha) {
        try {
            const startOfMonth = obtenerMes(fecha).startOfMonth
            const endOfMonth = obtenerMes(fecha).endOfMonth
            const registros = await Finanzas.findAll({
                where: {
                    fecha: {
                        [Sequelize.Op.between]: [startOfMonth, endOfMonth]
                    }
                },
                attributes: ['tipo', 'cantidad']
            })
            const tipos = registros.map(({ tipo, cantidad }) => ({ [tipo]: cantidad }));
            let ingresos = 0;
            let egresos = 0;

            tipos.forEach(tipo => {
                if (tipo.ingreso) {
                    ingresos += tipo.ingreso;
                } else if (tipo.egreso) {
                    egresos += tipo.egreso;
                }
            });

            const caja = ingresos - egresos;

            return {
                ingresos: ingresos,
                egresos: egresos,
                caja: caja
            };
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
    async verificarRegistrosDelMes(fecha) {
        const startOfMonth = obtenerMes(fecha).startOfMonth
        const endOfMonth = obtenerMes(fecha).endOfMonth
        const registroExistente = await Finanzas.findOne({
            where: {
                fecha: {
                    [Sequelize.Op.between]: [startOfMonth, endOfMonth]
                }
            },
            order: [['fecha', 'DESC']]
        })
        return registroExistente
    }
}