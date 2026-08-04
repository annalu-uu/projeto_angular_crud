import { Routes } from '@angular/router';

import { CadastroClientesComponent } from './componenets/cadastro-clientes/cadastro-clientes.component';
import { ListaComponent } from './componenets/lista/lista.component';

export const routes: Routes = [
    {
        path: "cadastro",
        component: CadastroClientesComponent
    },

    {
        path: "lista",
        component: ListaComponent
    }
]
