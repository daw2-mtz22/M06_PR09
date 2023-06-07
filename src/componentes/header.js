import { formEditarUsuario } from './formEditarUsuario'
import { User } from '../bd/user'
import { menuSuperior } from './menuSuperior'
import { menuUsuario } from './menuUsuario'

export const header = {
  template: `
  
<!-- Navbar  -->
<nav class="navbar navbar-expand-sm bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="#/home">
      <img
        src="/assets/logo_vanilla.svg"
        alt="Logo"
        width="30"
        height="30"
        class="d-inline-block align-text-top me-2"
      />
      <span class=""></span>
      Vanilla Games
    </a>
    
    <button
      class="navbar-toggler ms-auto
      "
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
    <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Menú superior -->
    ${menuSuperior.template}
    <!-- Menu usuario -->
    ${menuUsuario.template}
  </div>
</nav>

//Modals
${formEditarUsuario.template}
  `,
  script: async () => {
    // Capturamos los datos del usuario logueado
    const usuarioLogeado = await User.getUser()
    // Si hay un usuario logueado pintamos el email en el header y en el menú del usuario
    const divUsuarioLogeado = document.querySelectorAll('.emailUsuarioLogueado')
    if (usuarioLogeado) {
      divUsuarioLogeado[0].innerHTML = usuarioLogeado.email
      divUsuarioLogeado[1].innerHTML = usuarioLogeado.email
      // y ocultamos la opción login del menu del usuario
      document.querySelector('.liLogin').classList.add('d-none')
      document.querySelector('.liLogout').classList.remove('d-none')
    }

    // Capturamos click en logout
    document.querySelector('.liLogout').addEventListener('click', async () => {
      // Cerramos sesión utilizando el método de logout de nuestra clase User
      await User.logout()
      // Borramos de header el email del usuario logueado
      divUsuarioLogeado[0].innerHTML = ''
      divUsuarioLogeado[1].innerHTML = ''
      // y ocultamos la opción login del menu del usuario
      document.querySelector('.liLogout').classList.add('d-none')
      document.querySelector('.liLogin').classList.remove('d-none')
    })

    // Gestionamos click en editar perfil
    document.querySelector('#editarPerfil').addEventListener('click', (e) => {
      e.preventDefault()
      formEditarUsuario.script()
    })
  }

}
