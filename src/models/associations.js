import { Empleado } from "./empleadosModel.js";
import { HorasEmpleado } from "./horasEmpleadoModel.js";

HorasEmpleado.belongsTo(Empleado, { foreignKey: 'id_empleado' });
Empleado.hasMany(HorasEmpleado, { foreignKey: 'id_empleado' });

