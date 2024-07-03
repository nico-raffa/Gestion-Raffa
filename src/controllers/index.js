import { Router } from "express";
import { EmpleadosController } from "./empleadosController.js";
import { HorasEmpleadoController } from "./horasEmpleadoController.js";
import { FinanzasController } from "./finanzasController.js";

const cargarHorasController = new HorasEmpleadoController()
const empleadosController = new EmpleadosController()
const finanzasController = new FinanzasController()

export const routerEmpleados = new Router()
export const routerCargarHoras = new Router()
export const routerFinanzas = new Router()


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

//          ROUTER PARA CARGA DE INGRESOS O GASTOS DE DINERO

routerFinanzas.get("/", finanzasController.mostrarResumen)
routerFinanzas.post('/cargar', finanzasController.ingresarMovimiento)
routerFinanzas.get('/cargar', (req, res) => res.render('ingresarMovimiento'))
routerFinanzas.get('/mostrarUno', finanzasController.mostrarUnMovimiento)
routerFinanzas.get('/mostrarVarios', finanzasController.mostrarMovimientos)
