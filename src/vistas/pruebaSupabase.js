import { createClient } from '@supabase/supabase-js'

export const pruebaSupabase = {
    template: `<h1>pruebas Supabase</h1>`,
    script: async () => {
        console.log('conexión supabase');
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
        const supabase = createClient(supabaseUrl, supabaseKey)
        console.log(supabase);

        const leerTodosLosPerfiles = async () => {
            let {data: perfiles, error} = await supabase
                .from('perfiles')
                .select('*')
            return perfiles
        }
        let datos = await leerTodosLosPerfiles()
        console.log(datos)
        const agregarPerfil = async() =>{
            const { data, error } = await supabase
                .from('perfiles')
                .insert([
                    {nombre: 'nombreTest'},
                ])
        }
        await agregarPerfil();
        datos = await leerTodosLosPerfiles();
        console.log(datos);
        //leer proyectos detalle desde postgresSQL función
        const leerProyectosDetalle = async() =>{
            let { data, error } = await supabase
                .rpc('leerproyectosdetalle')
            if (error) console.error(error)
            else console.log(`proyectos con detalle`, data)
        }
        await leerProyectosDetalle()
    }
}
