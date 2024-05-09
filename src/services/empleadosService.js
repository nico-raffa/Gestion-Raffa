import { sequelize } from '../db.js'
import { Empleado } from '../models/empleadosModel.js'

export class EmpleadosService {

  async ingresarEmpleado(empleado) {
    try {
      const datosObligatorios = ["nombre", "apellido", "id_empleado", "precio_por_hora"]
        .filter(atributo => !empleado[atributo])
      if (datosObligatorios.length > 0) {
        throw new Error ('Faltan datos obligatorios: ' + datosObligatorios.join(", "))
      }
      const exist = await this.buscarEmpleadoPorId(empleado)
      if (exist) { throw new Error('USER_EXIST') }

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
      if (exist) {
        if (exist.dataValues.id_empleado === parseInt(idEmpleado)) {
          const empleadoModificado = {}
          if (Object.keys(datoNuevo).length === 0) {
            return datoNuevo
          } else {
            return datoNuevo
          }
          // if (datoNuevo.nombre !== undefined) {
          //   empleadoModificado.nombre = datoNuevo.nombre
          // }
          // if (datoNuevo.apellido !== undefined) {
          //   empleadoModificado.apellido = datoNuevo.apellido
          // }
          // if (datoNuevo.nacimiento !== undefined && !isNaN(datoNuevo.nacimiento)) {
          //   empleadoModificado.nacimiento = datoNuevo.nacimiento
          // }
          // if (datoNuevo.fecha_inicio !== undefined && !isNaN(datoNuevo.fecha_inicio)) {
          //   empleadoModificado.fecha_inicio = datoNuevo.fecha_inicio
          // }
          // if (datoNuevo.fecha_fin !== undefined && !isNaN(datoNuevo.fecha_fin)) {
          //   empleadoModificado.fecha_fin = datoNuevo.fecha_fin
          // }
          // if (datoNuevo.cargo !== undefined) {
          //   empleadoModificado.cargo = datoNuevo.cargo
          // }
          // if (datoNuevo.precio_por_hora !== undefined && !isNaN(datoNuevo.precio_por_hora)) {
          //   empleadoModificado.precio_por_hora = datoNuevo.precio_por_hora
          // }
          // const modificado = await Empleado.update(empleadoModificado, {
          //   where: {
          //     id_empleado: idEmpleado,
          //   }
          // })
          // if(modificado){
          //   return `Empleado ${exist.nombre}, modificado.`
          // }
        }
      } else {
        return 'Empleado no encontrado'
      }

    } catch (error) {
      console.log(error)
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