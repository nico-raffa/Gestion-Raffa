// Importar las dependencias necesarias
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db.js' // Reemplaza './sequelize' por la ruta a tu configuración de Sequelize y la conexión a la base de datos.

// Definir la clase del modelo que extiende la clase Model de Sequelize
export class Empleado extends Model { }

// Inicializar el modelo con las propiedades correspondientes a las columnas de la tabla
Empleado.init(
  {
    id_empleado: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      set(value) {
        this.setDataValue('nombre', value.charAt(0).toUpperCase() + value.slice(1));
      },
    },
    apellido: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      set(value) {
        this.setDataValue('apellido', value.charAt(0).toUpperCase() + value.slice(1));
      },
    },
    nacimiento: {
      type: DataTypes.DATE()
    },
    fecha_inicio: {
      type: DataTypes.DATE()
    },
    fecha_fin: {
      type: DataTypes.DATE()
    },
    cargo: {
      type: DataTypes.CHAR(50),
      set(value) {
        this.setDataValue('cargo', value.charAt(0).toUpperCase() + value.slice(1));
      },
    },
    precio_por_hora: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
    // ... definir más propiedades para otras columnas ...
  },
  {
    sequelize, // Pasar el objeto sequelize con la conexión a la base de datos
    modelName: 'empleados',
    // ... opciones adicionales ...
  }
);
