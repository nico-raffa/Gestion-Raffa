import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js'; 


export class HorasEmpleado extends Model {}

HorasEmpleado.init(
  {
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    horas_trabajadas: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    total_mensual: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize, // Pasar el objeto sequelize con la conexión a la base de datos
    modelName: 'horas_empleados',
  }
)

