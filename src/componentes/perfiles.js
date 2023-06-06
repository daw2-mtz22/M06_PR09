import { createClient } from '@supabase/supabase-js'

export const perfiles = {
    template: `perfiles`,
    script: async () => {
        console.log('conexión supabase');
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
        const supabase = createClient(supabaseUrl, supabaseKey)
        console.log(supabase);

        const getPerfiles = async () => {
            let {data: perfiles, error} = await supabase
                .from('perfiles')
                .select('*')
            return perfiles
        }
        let datos = await getPerfiles()
        console.log(datos)
        const addPerfil = async() =>{
            const { data, error } = await supabase
                .from('perfiles')
                .insert([
                    { usuarioId: 'c5940726-befb-49c8-b675-df559e93fcc5' ,nombre: 'nombreTest', apellidos: 'apellidoTest', nick:'nickTest'},
                ])
        }
        await addPerfil();
        datos = await getPerfiles();
        console.log(datos);

    }
}
