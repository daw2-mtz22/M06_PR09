import { User } from '../bd/user.js'

export default {
  template: `
  <div
  class="vh-100 d-flex align-items-center justify-content-center"
  style="padding-top: 100px"
>
  <div class="col-12 col-md-4">
      <h1 class="text-center p-2">Login</h1>
      <form id="login" class="p-3" novalidate>
          <label class="mt-3 form-label" for="email">Email</label>
          <input type="email" class="form-control" value="" required />
          <div class="invalid-feedback">Debes introducir un email valido</div>

          <label class="mt-3 form-label" for="nick">Contraseña: </label>
          <input type="password" class="form-control" value="" required />
          <div class="invalid-feedback">Esta no es una contraseña correcta</div>

          <button
              id="btn_submit"
              type="submit"
              class="mt-4 btn btn-success w-100"
          >
              Enviar
          </button>
          <p class="mt-3">
              <a href="">No recuerdo mi contraseña</a>
              <br />
              <a href="registro.html">Quiero Registrarme</a>
          </p>
          <p></p>
          <hr class="mt-5" />

          <button type="button" class="mt-1 btn btn-primary w-100">
              Login con Google
          </button>
      </form>
  </div>
</div>`,
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
  }
}
