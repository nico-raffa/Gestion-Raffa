import { EmpleadosController } from "./empleadosController.js";
import { Router } from "express";
import { HorasEmpleadoController } from "./horasEmpleadoController.js";
const cargarHorasController = new HorasEmpleadoController()
const empleadosController = new EmpleadosController()
export const routerEmpleados = new Router()
export const routerCargarHoras = new Router()
//          ROUTER PARA EMPLEADO
routerEmpleados.get("/", (req, res) => res.render('main', {}))
routerEmpleados.get("/verEmpleados", empleadosController.verEmpleado)
// routerEmpleados.get("/:dato", empleadosController.verEmpleado)
routerEmpleados.post("/crearEmpleado", empleadosController.crear)
routerEmpleados.get("/crearEmpleado", (req, res) => res.render('ingresarEmpleado', {}))
routerEmpleados.post("/modificarEmpleado/:id", empleadosController.modificarEmpleado)
routerEmpleados.get("/modificarEmpleado", (req, res) => res.render('modificar', {}))
routerEmpleados.delete("/", empleadosController.eliminarEmpleado)

//          ROUTER PARA CARGA DE HORAS DE EMPLEADO

routerCargarHoras.post("/cargar", cargarHorasController.cargarHoras)
routerCargarHoras.get("/cargar/:id_empleado", cargarHorasController.planillaCargarHoras)
routerCargarHoras.get("/", cargarHorasController.mostrarHorasPorEmpleado)