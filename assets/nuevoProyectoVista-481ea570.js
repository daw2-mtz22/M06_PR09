import { s as supabase, U as User } from "./main-a4218c0f.js";
class Proyecto {
  // Mapping de propiedades de la tabla proyectos
  constructor(id = null, created_at = null, nombre = null, descripcion = null, user_id = null, nota = null) {
    this.id = id;
    this.created_at = created_at;
    this.nombre = nombre;
    this.user_id = user_id;
    this.descripcion = descripcion;
    this.nota = nota;
  }
  // leer todos en orden descendiente a como se han creado
  static async getAll() {
    const { data: proyectos, error } = await supabase.from("proyectos").select("*").order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return proyectos.map(({ id, created_at, nombre, descripcion, user_id, nota }) => {
      return new Proyecto(id, created_at, nombre, descripcion, user_id, nota);
    });
  }
  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById(id) {
    const { data: proyectos, error } = await supabase.from("proyectos").select("*").eq("id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Proyecto(proyectos.id, proyectos.created_at, proyectos.nombre, proyectos.descripcion, proyectos.user_id, proyectos.nota);
  }
  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByUserId(id) {
    const { data: proyectos, error } = await supabase.from("proyectos").select("*").eq("user_id", id).single();
    if (error) {
      throw new Error(error.message);
    }
    return new Proyecto(proyectos.id, proyectos.created_at, proyectos.nombre, proyectos.descripcion, proyectos.user_id, proyectos.nota);
  }
  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create(proyectosData) {
    const { error } = await supabase.from("proyectos").insert(proyectosData).select();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  // actualizar
  async update() {
    const { error } = await supabase.from("proyectos").update({
      nombre: this.nombre,
      descripcion: this.descripcion,
      nota: this.nota
    }).eq("id", this.id).single();
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
  // borrar
  static async delete(id) {
    const { error } = await supabase.from("proyectos").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return true;
  }
}
const nuevoProyectoVista = {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <h1 class="text-center p-2">Nuevo Proyecto</h1>
      <form id="form_proyecto" class="p-3" novalidate>
          <label class="mt-3 form-label" for="nombre">Nombre: </label>
          <input
            id="nombre" 
            type="text" 
            class="form-control" 
            value="" 
            placeholder ="Nombre del proyecto" 
            required 
          />
          <div class="invalid-feedback">El nombre no es correcto</div>

          <label class="mt-3 form-label" for="descripcion">Descripción: </label>
          <textarea 
            id="descripcion"
            class="form-control" 
            value="" 
            required 
            />
          </textarea>
          <div class="invalid-feedback">Este campo no es correcto</div>

          <label class="mt-3 form-label" for="enlace">Enlace a producción</label>
          <input
              id="enlace"
              type="enlace"
              class="form-control"
              value=""
              placeholder = "http://miproyecto.com"
              required
          />
          <div class="invalid-feedback">El link no es correcto</div>
          <button type="submit" class="mt-5 btn btn-success">
              Crear nuevo proyecto
          </button>
      </form>
  </div>
</div>
    `,
  script: () => {
    document.querySelector("#form_proyecto").addEventListener("submit", async function(e) {
      e.preventDefault();
      try {
        const user = await User.getUser();
        const proyecto = {
          nombre: document.querySelector("#nombre").value,
          descripcion: document.querySelector("#descripcion").value,
          enlace: document.querySelector("#enlace").value,
          user_id: user.id
          // Tomamos el id del usuario logueado
        };
        await Proyecto.create(proyecto);
        alert("Proyecto creado con éxito");
      } catch (error) {
        console.log(error);
        alert("Error al crear proyecto " + error);
      }
    });
  }
};
export {
  nuevoProyectoVista as default
};
