import { createClient } from '@supabase/supabase-js'

export const pruebaSupabase = {
  template: '<h1>pruebas Supabase</h1>',
  script: async () => {
    console.log('conexión supabase')
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    console.log(supabase)

    const leerTodosLosPerfiles = async () => {
      const { data: perfiles, error } = await supabase
        .from('perfiles')
        .select('*')
      return perfiles
    }
    let datos = await leerTodosLosPerfiles()
    console.log(datos)
    const agregarPerfil = async () => {
      const { data, error } = await supabase
        .from('perfiles')
        .insert([
          { nombre: 'nombreTest' }
        ])
    }
    await agregarPerfil()
    datos = await leerTodosLosPerfiles()
    console.log(datos)
    // leer proyectos detalle desde postgresSQL función
    const leerProyectosDetalle = async () => {
      const { data, error } = await supabase
        .rpc('leerproyectosdetalle')
      if (error) console.error(error)
      else console.log('proyectos con detalle', data)
    }
    await leerProyectosDetalle()
    /* const eliminarUsuario = async()=>{
            const { data, error } = await supabase.auth.admin.deleteUser(
                'e220617d-25bf-475a-92fa-c6a31ee518b5'
            )
        }
        await eliminarUsuario()
        const registro = async ()=>{
            //USER SIGNUP
            let { data, error } = await supabase.auth.signUp({
                email: 'martinezasensioaaron@fpllefia.com',
                password: '123456'
            })
        }
        await registro() */
    const login = async () => {
      // USER LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'martinezasensioaaron@fpllefia.com',
        password: '123456'
      })
    }

    const logout = async () => {
      // USER LOGOUT
      const { error } = await supabase.auth.signOut()
    }

    const mostrarUsuarioLogeado = async () => {
      // GET USER
      const { data: { user } } = await supabase.auth.getUser()
      console.log('usuario logueado', user)
    }

    await mostrarUsuarioLogeado()
    await login()
    await mostrarUsuarioLogeado()
    await logout()
    await mostrarUsuarioLogeado()
  }
}
