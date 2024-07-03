import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Finanzas extends Model { }

Finanzas.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        categoria: {
            type: DataTypes.CHAR(20),
            allowNull: false,
            set(value) {
                this.setDataValue('categoria', value.charAt(0).toUpperCase() + value.slice(1))
            }
        },
        descripcion: {
            type: DataTypes.CHAR
        },
        cantidad: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        caja: {
            type: DataTypes.FLOAT(100, 2)
        },
        fecha: {
            type: DataTypes.DATEONLY
        },
        tipo: {
            type: DataTypes.CHAR(10)
        }
    },
    { sequelize, modelName: 'finanzas' }

)
// await Finanzas.bulkCreate([
//     { "categoria": "Ventas", "descripcion": "Venta de productos electrónicos", "cantidad": 1500.50, "caja": 5000.00, "fecha": "2023-06-15" },
//     { "categoria": "Compras", "descripcion": "Compra de suministros de oficina", "cantidad": 300.75, "caja": 4700.00, "fecha": "2023-06-16" },
//     { "categoria": "Salarios", "descripcion": "Pago de salarios a empleados", "cantidad": 5000.00, "caja": 2500.00, "fecha": "2023-06-20" },
//     { "categoria": "Marketing", "descripcion": "Gastos en publicidad online", "cantidad": 800.00, "caja": 1700.00, "fecha": "2023-06-22" },
//     { "categoria": "Servicios", "descripcion": "Pago de servicios de internet y electricidad", "cantidad": 200.50, "caja": 1500.00, "fecha": "2023-06-25" },
//     { "categoria": "Mantenimiento", "descripcion": "Reparación de equipos de oficina", "cantidad": 450.00, "caja": 1050.00, "fecha": "2023-06-28" },
//     { "categoria": "Ventas", "descripcion": "Venta de servicios de consultoría", "cantidad": 2500.00, "caja": 3550.00, "fecha": "2023-07-01" },
//     { "categoria": "Compras", "descripcion": "Compra de muebles de oficina", "cantidad": 1200.00, "caja": 2350.00, "fecha": "2023-07-02" },
//     { "categoria": "Salarios", "descripcion": "Pago de bonos a empleados", "cantidad": 1500.00, "caja": 850.00, "fecha": "2023-07-03" },
//     {  "categoria": "Marketing", "descripcion": "Campaña publicitaria en redes sociales", "cantidad": 600.00, "caja": 250.00, "fecha": "2023-07-04" }
// ]
// )