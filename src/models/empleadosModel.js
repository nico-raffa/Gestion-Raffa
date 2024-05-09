// Importar las dependencias necesarias
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../db.js' // Reemplaza './sequelize' por la ruta a tu configuración de Sequelize y la conexión a la base de datos.

// Definir la clase del modelo que extiende la clase Model de Sequelize
export class Empleado extends Model { }

// Inicializar el modelo con las propiedades correspondientes a las columnas de la tabla
Empleado.init(
  {
    id_empleado: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.DATEONLY
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
    },
    fecha_fin: {
      type: DataTypes.DATEONLY
    },
    cargo: {
      type: DataTypes.STRING,
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
// await Empleado.bulkCreate([
//   { id_empleado: '19900515', nombre: 'Juan', apellido: 'Perez', nacimiento: '1990-05-15', fecha_inicio: '2023-01-10', cargo: 'Gerente', precio_por_hora: 30.00 },
//   { id_empleado: '19850920', nombre: 'María', apellido: 'González', nacimiento: '1985-09-20', fecha_inicio: '2023-02-05', cargo: 'Analista', precio_por_hora: 25.00 },
//   { id_empleado: '19920703', nombre: 'Carlos', apellido: 'López', nacimiento: '1992-07-03', fecha_inicio: '2023-03-15', cargo: 'Desarrollador', precio_por_hora: 20.00 },
//   { id_empleado: '19931112', nombre: 'Ana', apellido: 'Martínez', nacimiento: '1993-11-12', fecha_inicio: '2023-04-20', cargo: 'Diseñador', precio_por_hora: 22.00 },
//   { id_empleado: '19880325', nombre: 'Pedro', apellido: 'Sánchez', nacimiento: '1988-03-25', fecha_inicio: '2023-05-01', cargo: 'Contador', precio_por_hora: 28.00 },
//   { id_empleado: '19911208', nombre: 'Laura', apellido: 'Díaz', nacimiento: '1991-12-08', fecha_inicio: '2023-06-10', cargo: 'Marketing', precio_por_hora: 23.00 },
//   { id_empleado: '19940218', nombre: 'José', apellido: 'Romero', nacimiento: '1994-02-18', fecha_inicio: '2023-07-15', cargo: 'Ventas', precio_por_hora: 24.00 },
//   { id_empleado: '19870630', nombre: 'Sofía', apellido: 'Fernández', nacimiento: '1987-06-30', fecha_inicio: '2023-08-20', cargo: 'Recursos Humanos', precio_por_hora: 26.00 },
//   { id_empleado: '19900905', nombre: 'Diego', apellido: 'Torres', nacimiento: '1990-09-05', fecha_inicio: '2023-09-01', cargo: 'Analista', precio_por_hora: 25.00 },
//   { id_empleado: '19950417', nombre: 'Elena', apellido: 'Ruiz', nacimiento: '1995-04-17', fecha_inicio: '2023-10-10', cargo: 'Desarrollador', precio_por_hora: 20.00 }
// ]);