import { header } from './componentes/header'
import { footer } from './componentes/footer'
// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import {pruebaSupabase} from "./vistas/pruebaSupabase.js";

//Importamos el componente por defecto
const componenteHome = await import('./vistas/home')
//Extraemos el objeto
const homeVista = componenteHome.default
//Inyectamos el componente header
document.querySelector('header').innerHTML = header.template
//Inyectamos la vista home
document.querySelector('main').innerHTML = pruebaSupabase.template
pruebaSupabase.script()
//Inyectamos el componente footer
document.querySelector('footer').innerHTML = footer.template