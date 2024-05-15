import { sequelize } from '../db.js'
import { Empleado } from '../models/empleadosModel.js'
import { transformarFecha } from '../utils/fecha.js'

export class EmpleadosService {

  async ingresarEmpleado(empleado) {
    try {
      const datosObligatorios = ["nombre", "apellido", "id_empleado", "precio_por_hora"]
        .filter(atributo => !empleado[atributo])
      if (datosObligatorios.length > 0) {
        throw new Error('Faltan datos obligatorios: ' + datosObligatorios.join(", "))
      }
      const exist = await this.buscarEmpleadoPorId(empleado)
      if (exist) { throw new Error('USER_EXIST') }
      if(empleado.nacimiento === ""){
        empleado.nacimiento = null
      }
      if(empleado.fecha_fin === ""){
        empleado.fecha_fin = null
      }
      empleado.fecha_inicio = new Date()
      const empleadoNuevo = await Empleado.create(empleado)
      return empleadoNuevo

    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  async buscarEmpleadoPorId(dato) {
    try {
      const resultado = await Empleado.findOne({ where: { id_empleado: dato.id_empleado } })
      if (resultado) {
        return resultado
      } else {
        return false
      }
    } catch (error) {
      return error
    }

  }
  async buscarEmpleados(dato) {
    try {
      if (!dato) {
        const todosLosEmpleados = await Empleado.findAll()

        return todosLosEmpleados
      }
      const condiciones = {}
      const atributos = [
        "id",
        "nombre",
        "apellido",
        "nacimiento",
        "fecha_inicio",
        "fecha_fin",
        "cargo",
        "precio_por_hora",
        "id_empleado"
      ]
      atributos.forEach(atributo => {
        if (dato[atributo] !== undefined) {
          condiciones[atributo] =
            atributo === "nombre" || atributo === "apellido"
              ? sequelize.literal(`UPPER(${atributo}) = UPPER('${dato[atributo]}')`)
              : dato[atributo]
        }
      })
      const empleadosEncontrados = await Empleado.findAll({
        where: condiciones
      })
      // console.log(empleadosEncontrados)
      return empleadosEncontrados
    } catch (error) {
      return error
    }
  }
  async modificarEmpleado(idEmpleado, datoNuevo) {
    try {
      let exist = await this.buscarEmpleadoPorId({ id_empleado: idEmpleado })
      if (!exist) {
        throw new Error('USER_DOES_NOT_EXIST')
      }
      if (datoNuevo.nacimiento && datoNuevo.nacimiento !== '') {
        datoNuevo.nacimiento = transformarFecha(datoNuevo.nacimiento);
      }
      if (datoNuevo.fecha_inicio && datoNuevo.fecha_inicio !== '') {
        datoNuevo.fecha_inicio = transformarFecha(datoNuevo.fecha_inicio);
      }
      if (datoNuevo.fecha_fin && datoNuevo.fecha_fin !== '') {
        datoNuevo.fecha_fin = transformarFecha(datoNuevo.fecha_fin);
      }
      await Empleado.update(datoNuevo, {
        where: {
          id_empleado: idEmpleado,
        }
      })
      return true

    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  async eliminarEmpleado(idEmpleado) {
    let exist = await this.buscarEmpleados({ id_empleado: idEmpleado })
    if (exist) {
      await Empleado.destroy({
        where: {
          id_empleado: idEmpleado
        }
      })
      return exist
    } else {
      return `El empleado buscado con el id de empleado: ${JSON.stringify(idEmpleado)}, no existe`
    }
  }
}