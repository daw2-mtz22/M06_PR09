import { createClient } from '@supabase/supabase-js'
// Creando la conexión con supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
