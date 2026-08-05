import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroClientesComponent } from './componenets/cadastro-clientes/cadastro-clientes.component';
import { MenuComponent } from './componenets/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto_angular_crud';
}
