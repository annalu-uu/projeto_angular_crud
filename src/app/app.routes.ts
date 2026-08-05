import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './componenets/cadastro-clientes/cadastro-clientes.component';
import { ListaComponent } from './componenets/lista/lista.component';
import { HomeComponentComponent } from './home-component/home-component/home-component.component';

/*
 * Cada rota associa um endereço do navegador a um componente. O menu muda a
 * URL e o RouterOutlet do AppComponent exibe o componente correspondente.
 */
export const routes: Routes = [
  { path: 'cadastro', component: CadastroClientesComponent },
  { path: 'cadastro/:id', component: CadastroClientesComponent },
  { path: 'consulta', component: ListaComponent },
  { path: 'home', component: HomeComponentComponent},

  // Ao entrar no endereço principal, direciona para a página de cadastro.
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },

  // Qualquer endereço desconhecido também volta para o cadastro.
  { path: '**', redirectTo: 'cadastro' }
];