import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})
export class CadastroClientesComponent {

  cliente: Cliente = new Cliente()

  listaClientes: Cliente[] = []


  salvar() {

    this.listaClientes.push(this.cliente)

    this.cliente = new Cliente()

  }


}
