import { EmpleadosController } from "./empleadosController.js";
import { Router } from "express";
import { HorasEmpleadoController } from "./horasEmpleadoController.js";
const cargarHorasController = new HorasEmpleadoController()
const empleadosController = new EmpleadosController()
export const routerEmpleados = new Router()
export const routerCargarHoras = new Router()
//          ROUTER PARA EMPLEADO
routerEmpleados.get("/", empleadosController.verEmpleado)
routerEmpleados.post("/", empleadosController.crear)
routerEmpleados.post("/modificarEmpleado", empleadosController.modificarEmpleado)
routerEmpleados.delete("/", empleadosController.eliminarEmpleado)

//          ROUTER PARA CARGA DE HORAS DE EMPLEADO

routerCargarHoras.post("/cargar", cargarHorasController.cargarHoras)
routerCargarHoras.post("/modificar", cargarHorasController.modificarHoras)