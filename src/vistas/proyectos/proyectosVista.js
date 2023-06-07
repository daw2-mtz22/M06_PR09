export default {
  template: `
  <main style="padding-top: 100px">
  <div class="container">
      <h1>Proyectos</h1>
      <a href="/#/nuevoProyecto" id="nuevoProyecto" class="btn btn-success mt-3">Nuevo Proyecto</a>
      <a href="/#/misProyectos" id="misProyectos" class="btn btn-warning mt-3 ms-2">Mis Proyectos</a>
      <table id="tablaProyectos" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th></th>
                  <th>AUTOR</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>ENLACE</th>
                  <th class="w-100"></th>
              </tr>
          </thead>
          <tbody>
                     
              
              
          </tbody>
      </table>
  </div>
</main>

`,
  script: async () => {
    let tabla = ''

    for (const proyecto of proyectos) {
      tabla += `
      <tr>
        <td>
          <img src="/assets/imagenes/proyectos/proyecto.png" width="100" alt="" data-id="${proyecto.id}" class="detalle"/>
        </td>
        <td>${proyecto.user_id}</td>
        <td>${proyecto.nombre}</td>
        <td class="w-100">${proyecto.descripcion}</td>
        <td><a href="${proyecto.enlace}" target="_black">${proyecto.enlace}</a></td>
        <td class="text-end">
          <button
            data-id="${proyecto.id}"
            type="button"
            class="btn text-danger detalle"
          >
          <img  data-id="${proyecto.id}" class="detalle w-100" src="/assets/iconos/icons8-acerca-de.svg" width="20" alt="" />
          </button>
          <button
            data-id="${proyecto.id}"
            type="button"
            class="btn text-info editar"
          >
            <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${proyecto.id}"/>
          </button>

          <button
              data-id="${proyecto.id}"
              type="button"
              class="btn text-danger borrar"
          >
            <img  data-id="${proyecto.id}" class="borrar w-100" src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
          </button>
        </td>
      </tr>
      `
    }
    const tablaProyectosBody = document.querySelector('#tablaProyectos tbody')
    if (tablaProyectosBody) tablaProyectosBody.innerHTML = tabla
  }
}
