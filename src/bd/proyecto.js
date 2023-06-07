// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Proyecto {
  // Mapping de propiedades de la tabla proyectos
  constructor (id = null, created_at = null, nombre = null, descripcion = null, user_id = null, nota = null) {
    this.id = id
    this.created_at = created_at
    this.nombre = nombre
    this.user_id = user_id
    this.descripcion = descripcion
    this.nota = nota
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return proyectos.map(({ id, created_at, nombre, descripcion, user_id, nota }) => {
      return new Proyecto(id, created_at, nombre, descripcion, user_id, nota)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Proyecto(proyectos.id, proyectos.created_at, proyectos.nombre, proyectos.descripcion, proyectos.user_id, proyectos.nota)
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId (id) {
    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('user_id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    // Devuelve un nuevo objeto con los datos del registro
    return new Proyecto(proyectos.id, proyectos.created_at, proyectos.nombre, proyectos.descripcion, proyectos.user_id, proyectos.nota)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (proyectosData) {
    const { error } = await supabase
      .from('proyectos')
      .insert(proyectosData)
      .select()
    // console.log('nuevo proyectos ',error);
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('proyectos')
      .update({
        nombre: this.nombre,
        descripcion: this.descripcion,
        nota: this.nota
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // borrar
  static async delete (id) {
    const { error } = await supabase
      .from('proyectos')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
